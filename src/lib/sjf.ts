import { Process } from "@/types/process";
import { ProcessResult } from "@/types/result";

export function calculateSJF(processes: Process[]): ProcessResult[] {
  let currentTime = 0;

  const sortedProcesses = [...processes].sort((a, b) => {
    if (a.arrivalTime === b.arrivalTime) {
      return a.runTime - b.runTime; 
    }
    return a.arrivalTime - b.arrivalTime; 
  });

  const result: ProcessResult[] = sortedProcesses.map((process) => {
    const startTime = Math.max(currentTime, process.arrivalTime);
    const finishTime = startTime + process.runTime;
    const waitingTime = startTime - process.arrivalTime;
    const turnaroundTime = finishTime - process.arrivalTime;

    currentTime = finishTime;

    return {
      ...process,
      startTime,
      finishTime,
      waitingTime,
      turnaroundTime,
    };
  });

  return result;
}
