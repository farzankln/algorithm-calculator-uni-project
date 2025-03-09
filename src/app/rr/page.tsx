"use client";
import { useState } from "react";
import ProcessForm from "@/components/forms/ProcessForm";
import ResultTable from "@/components/results/ResultTable";
import GanttChart from "@/components/results/GanttChart";
import { calculateRR } from "@/lib/rr";
import { ProcessResult } from "@/types/result";
import { Process } from "@/types/process";

export default function RRPage() {
  const [result, setResult] = useState<ProcessResult[]>([]);
  const [quantum, setQuantum] = useState<string>("");
  const [contextSwitch, setContextSwitch] = useState<string>("");

  const handleSubmit = (processes: Process[]) => {
    const quantumValue = parseInt(quantum);
    const contextSwitchValue = parseInt(contextSwitch);

    if (isNaN(quantumValue)) {
      alert("Please enter quantum value");
      return;
    }

    const calculated = calculateRR(
      processes,
      quantumValue,
      isNaN(contextSwitchValue) ? 0 : contextSwitchValue
    );
    setResult(calculated);
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 space-y-6">
      <h1 className="text-2xl font-bold">Round Robin</h1>
      <ProcessForm onSubmit={handleSubmit} />
      <div className="grid grid-cols-2 gap-4 space-y-4 p-4 bg-white rounded-lg shadow-md xl:w-6/12 lg:w-7/12 md:w-9/12 w-12/12 md:text-base text-sm">
        <div>
          <label className="block mb-2">Quantum:</label>
          <input
            type="number"
            min="1"
            placeholder="Example: 4"
            className="border p-2 rounded w-full"
            value={quantum}
            onChange={(e) => setQuantum(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2">Context Switch Time:</label>
          <input
            type="number"
            min="0"
            placeholder="Example: 1"
            className="border p-2 rounded w-full"
            value={contextSwitch}
            onChange={(e) => setContextSwitch(e.target.value)}
          />
        </div>
      </div>
      {result.length > 0 && (
        <div className="space-y-4 p-4 bg-white rounded-lg shadow-md xl:w-6/12 lg:w-7/12 md:w-9/12 w-12/12 md:text-base text-sm">
          <ResultTable processes={result} />
          <GanttChart processes={result} />
        </div>
      )}
    </div>
  );
}
