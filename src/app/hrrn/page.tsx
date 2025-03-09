"use client";
import { useState } from "react";
import ProcessForm from "@/components/forms/ProcessForm";
import ResultTable from "@/components/results/ResultTable";
import GanttChart from "@/components/results/GanttChart";
import { calculateHRRN } from "@/lib/hrrn";
import { ProcessResult } from "@/types/result";
import { Process } from "@/types/process";

export default function HRRNPage() {
  const [result, setResult] = useState<ProcessResult[]>([]);

  const handleSubmit = (processes: Process[]) => {
    const calculated = calculateHRRN(processes);
    setResult(calculated);
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 space-y-6">
      <h1 className="text-2xl font-bold">HRRN</h1>
      <ProcessForm onSubmit={handleSubmit} />
      {result.length > 0 && (
        <div className="space-y-4 p-4 bg-white rounded-lg shadow-md xl:w-6/12 lg:w-7/12 md:w-9/12 w-12/12 md:text-base text-sm">
          <ResultTable processes={result} />
          <GanttChart processes={result} />
        </div>
      )}
    </div>
  );
}
