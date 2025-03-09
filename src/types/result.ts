import { Process } from "./process";

export interface ProcessResult extends Process {
  startTime: number;
  finishTime: number;
  waitingTime: number;
  turnaroundTime: number;
  contextSwitches?: number; 
}
