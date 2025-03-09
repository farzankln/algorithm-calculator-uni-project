// src/lib/rr.ts
import { Process } from "@/types/process";
import { ProcessResult } from "@/types/result";

export function calculateRR(
  processes: Process[],
  quantum: number,
  contextSwitchTime: number
): ProcessResult[] {
  let currentTime = 0;
  const queue = [...processes];
  const result: ProcessResult[] = [];
  const remainingRunTime = processes.map((p) => p.runTime);
  let lastProcessId: string | null = null;

  while (queue.length > 0) {
    const process = queue.shift()!;
    const timeToRun = Math.min(
      remainingRunTime[parseInt(process.id) - 1],
      quantum
    );

    if (lastProcessId && lastProcessId !== process.id) {
      currentTime += contextSwitchTime;
    }

    const startTime = currentTime;
    currentTime += timeToRun;
    remainingRunTime[parseInt(process.id) - 1] -= timeToRun;

    result.push({
      ...process,
      startTime,
      finishTime: currentTime,
      waitingTime: startTime - process.arrivalTime,
      turnaroundTime: currentTime - process.arrivalTime,
    });

    if (remainingRunTime[parseInt(process.id) - 1] > 0) {
      queue.push(process);
    }

    lastProcessId = process.id;
  }

  return result;
}
