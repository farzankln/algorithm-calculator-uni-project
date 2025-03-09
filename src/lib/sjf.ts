import { Process } from "@/types/process";
import { ProcessResult } from "@/types/result";

export function calculateSJF(processes: Process[]): ProcessResult[] {
  let currentTime = 0;

  // ابتدا فرآیندها را بر اساس زمان ورود و سپس براساس زمان burst مرتب می‌کنیم
  const sortedProcesses = [...processes].sort((a, b) => {
    if (a.arrivalTime === b.arrivalTime) {
      return a.runTime - b.runTime; // مرتب‌سازی بر اساس burst time
    }
    return a.arrivalTime - b.arrivalTime; // مرتب‌سازی بر اساس arrival time
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
