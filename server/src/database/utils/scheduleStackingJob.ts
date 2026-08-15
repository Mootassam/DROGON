import { stackingQueue } from "./stackingQueue";

export async function scheduleStackingJob(record, tenant) {

  // Calculate delay based on when the stacking period ends
  const now = new Date();
  const endDate = new Date(record.endDate); // Use the actual endDate from the stacking record

  // Calculate delay in milliseconds until the end date
  const delayMs = endDate.getTime() - now.getTime();

  // If the end date is in the past, process immediately (delay = 0)
  const finalDelay = Math.max(0, delayMs);
  console.log("🚀 ~ scheduleStackingJob ~ finalDelay:", finalDelay)

  await stackingQueue.add(
    `auto-finalize-${record.id}-${Date.now()}`,
    { stackingId: record.id, tenantId: tenant.id },
    {
      delay: finalDelay,
      attempts: 3,
      backoff: { type: "exponential", delay: 1000 },
    }
  );

  console.log(`⏰ Job scheduled for ${new Date(now.getTime() + finalDelay)} (in ${Math.round(finalDelay / 1000)} seconds)`);
}