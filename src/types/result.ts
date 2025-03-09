import { Process } from "./process";

// src/types/result.ts
export interface ProcessResult extends Process {
  startTime: number;
  finishTime: number;
  waitingTime: number;
  turnaroundTime: number;
  contextSwitches?: number; // اضافه کردن فیلد جدید
}
