import { Process } from "@/types/process";
import { ProcessResult } from "@/types/result";

export function calculateHRRN(processes: Process[]): ProcessResult[] {
  let currentTime = 0;
  const remainingProcesses = [...processes]; 
  const result: ProcessResult[] = [];

  while (remainingProcesses.length > 0) {
    let highestRr = -Infinity;
    let highestRrIndex = -1;

    for (let i = 0; i < remainingProcesses.length; i++) {
      const process = remainingProcesses[i];
      if (process.arrivalTime <= currentTime) {
        const waitingTime = currentTime - process.arrivalTime;
        const responseRatio =
          (waitingTime + process.runTime) / process.runTime;

        if (responseRatio > highestRr) {
          highestRr = responseRatio;
          highestRrIndex = i;
        }
      }
    }

    if (highestRrIndex !== -1) {
      const process = remainingProcesses[highestRrIndex];
      currentTime += process.runTime;
      remainingProcesses.splice(highestRrIndex, 1);

      result.push({
        ...process,
        startTime: currentTime - process.runTime,
        finishTime: currentTime,
        waitingTime: currentTime - process.arrivalTime - process.runTime,
        turnaroundTime: currentTime - process.arrivalTime,
      });
    } else {
      currentTime++;
    }
  }

  return result;
}
