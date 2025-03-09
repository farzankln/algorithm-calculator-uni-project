import { Process } from "@/types/process";
import { ProcessResult } from "@/types/result";

export function calculateSRTF(processes: Process[]): ProcessResult[] {
  const n = processes.length;
  const remainingRunTime = processes.map((p) => p.runTime);
  const completionTime = Array(n).fill(0);
  const isCompleted = Array(n).fill(false);
  let currentTime = 0;
  let completed = 0;

  while (completed < n) {
    let idx = -1;
    let minRemainingTime = Infinity;

    for (let i = 0; i < n; i++) {
      if (
        processes[i].arrivalTime <= currentTime &&
        !isCompleted[i] &&
        remainingRunTime[i] < minRemainingTime &&
        remainingRunTime[i] > 0
      ) {
        minRemainingTime = remainingRunTime[i];
        idx = i;
      }
    }

    if (idx === -1) {
      const nextArrival = processes
        .filter((p, i) => !isCompleted[i])
        .map((p) => p.arrivalTime)
        .filter((time) => time > currentTime);

      if (nextArrival.length > 0) {
        currentTime = Math.min(...nextArrival);
      } else {
        break;
      }
      continue;
    }

    remainingRunTime[idx]--;
    currentTime++;

    if (remainingRunTime[idx] === 0) {
      isCompleted[idx] = true;
      completed++;
      completionTime[idx] = currentTime;
    }
  }

  const result: ProcessResult[] = processes.map((process, i) => {
    const turnaroundTime = completionTime[i] - process.arrivalTime;
    const waitingTime = turnaroundTime - process.runTime;
    return {
      ...process,
      startTime: process.arrivalTime,
      finishTime: completionTime[i],
      turnaroundTime,
      waitingTime,
    };
  });

  return result;
}
