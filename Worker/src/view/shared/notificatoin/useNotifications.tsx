
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import userListActions from 'src/modules/user/list/userListActions';

let socket: Socket | null = null;

export default function useNotifications(
  userId: string,
  isAdmin: boolean = false,
) {


  const dispatch = useDispatch();
  useEffect(() => {
    if (!userId) return;

    if (!socket) {
      socket = io('http://159.198.45.60:8082', {
        transports: ['websocket'], // ensure stable connection
      });
    }

    // Register user/admin on connect
    socket.emit('register', { userId, isAdmin });

    // Debug success message
    socket.on('success', (data) => {
      console.log('✅ Backend says:', data);
    });

    // Listen to new notifications
    socket.on('admin', async (notif) => {
            await dispatch(userListActions.count());
    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.off('success');
        socket.off('newNotification');
      }
    };
  }, [dispatch]);


}
