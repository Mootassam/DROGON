
import { Server as SocketIOServer } from "socket.io";
import notification from "../database/models/notification";
import { IRepositoryOptions } from "../database/repositories/IRepositoryOptions";
import NotificationRepository from "../database/repositories/notificationtRepository";

// Extend SocketIO Server type with custom properties
interface ExtendedSocketIOServer extends SocketIOServer {
  users?: Record<string, string>; // userId -> socket.id
  admins?: Record<string, string>; // adminId -> socket.id
}

let io: ExtendedSocketIOServer;

// Initialize io instance
export const setSocketIO = (socketIOInstance: SocketIOServer) => {
  io = socketIOInstance as ExtendedSocketIOServer;

  // initialize maps
  io.users = io.users || {};
  io.admins = io.admins || {};

  io.on("connection", (socket) => {

    // Send immediate success message (optional)
    socket.emit("success", "Connected successfully!");

    // Register user/admin
    socket.on(
      "register",
      ({ userId, isAdmin }: { userId: string; isAdmin?: boolean }) => {
        if (!userId) return;
        if (isAdmin) {
          io.admins![userId] = socket.id;
        } else {
          io.users![userId] = socket.id;
        }
      }
    );

    // Handle disconnect
    socket.on("disconnect", () => {
      for (const [id, sid] of Object.entries(io.users!)) {
        if (sid === socket.id) delete io.users![id];
      }
      for (const [id, sid] of Object.entries(io.admins!)) {
        if (sid === socket.id) delete io.admins![id];
      }
    });
  });
};

interface NotificationData {
  userId?: string;
  message: string;
  type: string; // deposit, withdraw, kyc, etc.
  forAdmin?: boolean;
  options: IRepositoryOptions;
}

export async function sendNotification({
  userId,
  message,
  type,
  forAdmin = false,
  options,
}: NotificationData) {
  // Save notification to DB

  const data = {
    userId,
    message,
    type,
    forAdmin,
  };
  let notif;

  // Emit real-time
  if (forAdmin) {
    io.emit("admin", type);
  } else if (userId) {
    const notif = await NotificationRepository.create(data, options);
    const unread = await NotificationRepository.unread(options);
    const socketId = io.users![userId];
    if (socketId) {
      io.to(socketId).emit("newNotification", unread);
    } else {
    }
  }

  return notif;
}
