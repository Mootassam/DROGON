import { Server as SocketIOServer } from 'socket.io';
import marketDataService from './marketDataService';

class MarketWebSocketService {
  private io: SocketIOServer | null = null;
  private broadcastInterval: NodeJS.Timeout | null = null;
  private subscribers = new Set<string>(); // socket IDs

  initialize(io: SocketIOServer) {
    this.io = io;

    // Handle client connections
    io.on('connection', (socket) => {
      console.log(`Market WS client connected: ${socket.id}`);

      // Subscribe to market updates
      socket.on('subscribe-market', () => {
        this.subscribers.add(socket.id);
        socket.emit('market-subscribed', { success: true });
      });

      // Unsubscribe
      socket.on('unsubscribe-market', () => {
        this.subscribers.delete(socket.id);
      });

      socket.on('disconnect', () => {
        this.subscribers.delete(socket.id);
      });
    });

    // Start broadcasting every 2 seconds (real-time updates)
    this.startBroadcasting();
  }

  private startBroadcasting() {
    if (this.broadcastInterval) {
      clearInterval(this.broadcastInterval);
    }

    this.broadcastInterval = setInterval(async () => {
      if (this.subscribers.size === 0 || !this.io) return;

      try {
        const data = await marketDataService.getMarketData(true);
        this.io.emit('market-update', data);
      } catch (error) {
        console.error('Market broadcast error:', error);
      }
    }, 2000); // Every 2 seconds
  }

  stop() {
    if (this.broadcastInterval) {
      clearInterval(this.broadcastInterval);
      this.broadcastInterval = null;
    }
  }
}

export default new MarketWebSocketService();
