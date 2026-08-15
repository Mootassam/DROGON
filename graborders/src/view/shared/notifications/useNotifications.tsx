import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";
import notificationListActions from "src/modules/notification/list/notificationListActions";

let socket: Socket | null = null;

export default function useNotifications(
  userId: string,
  isAdmin: boolean = false
) {
  const [notifications, setNotifications] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) return;
    
    if (!socket) {
      socket = io("https://trade-Icmarkets.com", {
        transports: ["websocket"],
        // Optional: Add reconnection options
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });
    }

    // Register user/admin on connect
    socket.emit("register", { userId, isAdmin });

    // Debug success message
    socket.on("success", (data) => {
      console.log("Socket connected successfully", data);
    });

    // Handle connection errors
    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    // Listen to new notifications
    socket.on("newNotification", (notif) => {
      dispatch(notificationListActions.doFetch());
    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.off("success");
        socket.off("newNotification");
        socket.off("connect_error");
      }
    };
  }, [userId, isAdmin]);

  return { notifications };
}