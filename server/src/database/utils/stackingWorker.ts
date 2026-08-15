// // src/workers/stackingWorker.ts
// import 'dotenv/config';
// import { Worker } from 'bullmq';
// import redisConnection from '../redisConnection';
// import { STACKING_QUEUE_NAME } from '../utils/stackingQueue';
// import { autoFinalizeStackingJob } from './autoFinalizeStackingJob';


// export const stackingWorker = new Worker(
//   STACKING_QUEUE_NAME,
//   autoFinalizeStackingJob,
//   {
//     connection: redisConnection,
//     concurrency: 5,
//   }
// );

// stackingWorker.on('completed', job => {
//   console.log(`Stacking job ${job.id} completed`);
// });

// stackingWorker.on('failed', (job, err) => {
//   console.error(`❌ Job ${job?.id} failed: ${err.message}`);
// });

// process.on('SIGTERM', async () => {
//   await stackingWorker.close();
// });
