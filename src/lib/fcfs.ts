import { Process } from "@/types/process";
import { ProcessResult } from "@/types/result";

export function calculateFCFS(processes: Process[]): ProcessResult[] {
  let currentTime = 0;

  // Sort by arrivalTime and then by id
  const sortedProcesses = [...processes].sort((a, b) => {
    if (a.arrivalTime === b.arrivalTime) {
      return parseInt(a.id) - parseInt(b.id);
    }
    return a.arrivalTime - b.arrivalTime;
  });

  return sortedProcesses.map((process) => {
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
}
