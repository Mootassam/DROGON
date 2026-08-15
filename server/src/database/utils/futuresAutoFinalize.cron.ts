import cron from "node-cron";
import { RedisService } from "../redisConnection";
import { databaseInit } from "../databaseConnection";
import FuturesRepository from "../repositories/futuresRepository";

/**
 * Starts the futures auto-finalize cron job.
 * Runs every 10 seconds to automatically finalize expired futures trades
 * and pre-emptively mark as loss those within 20 seconds of expiry
 * that haven't been manually updated to "profit" by admins.
 */
export async function startFuturesAutoFinalizeCron() {
  const redis = RedisService.getClient();

  // Run every 10 seconds to ensure we catch the 20-second pre-emptive window
  cron.schedule("*/10 * * * * *", async () => {
    console.log(`[FuturesAutoFinalize] Cron triggered at ${new Date().toISOString()}`);

    let database: any;
    try {
      // Initialize database connection (reuses if already connected)
      database = await databaseInit();

      // Prepare options for repository calls
      const repositoryOptions = {
        database,
        language: 'en',
        currentUser: { id: null },
        currentTenant: { id: null }
      };

      // Process all expired futures
      const result = await FuturesRepository.autoFinalizeExpired(repositoryOptions);

      if (result.processed > 0) {
        console.log(`[FuturesAutoFinalize] Auto-finalized ${result.processed} futures trade(s)`);
      }
    } catch (error) {
      console.error("[FuturesAutoFinalize] Error:", error);
    }
  });

  console.log("[FuturesAutoFinalize] Cron job scheduled (runs every 10 seconds)");
}
