"use client";
import { useState } from "react";
import { Process } from "@/types/process";

type ProcessInput = Omit<Process, "arrivalTime" | "runTime"> & {
  arrivalTime: number | null;
  runTime: number | null;
};

export default function ProcessForm({
  onSubmit,
}: {
  onSubmit: (processes: Process[]) => void;
}) {
  const [processes, setProcesses] = useState<ProcessInput[]>([
    { id: "1", arrivalTime: null, runTime: null },
  ]);

  const addProcess = () => {
    setProcesses([
      ...processes,
      {
        id: (processes.length + 1).toString(),
        arrivalTime: null,
        runTime: null,
      },
    ]);
  };

  const deleteProcess = (index: number) => {
    const updated = processes.filter((_, i) => i !== index);
    if (updated.length === 0) {
      setProcesses([{ id: "1", arrivalTime: null, runTime: null }]);
      return;
    }
    setProcesses(
      updated.map((p, i) => ({
        ...p,
        id: (i + 1).toString(),
      }))
    );
  };

  const updateProcess = (
    index: number,
    field: "arrivalTime" | "runTime",
    value: string
  ) => {
    const numericValue = value === "" ? null : Math.max(0, Number(value));

    const updated = [...processes];
    updated[index][field] = numericValue;
    setProcesses(updated);
  };

  const handleSubmit = () => {
    const hasInvalid = processes.some(
      (p) =>
        p.arrivalTime === null ||
        p.runTime === null ||
        p.arrivalTime < 0 ||
        p.runTime < 0
    );

    if (hasInvalid) {
      alert("Please fill all fields with valid positive numbers");
      return;
    }

    const validProcesses: Process[] = processes.map((p) => ({
      id: p.id,
      arrivalTime: p.arrivalTime!,
      runTime: p.runTime!,
    }));

    onSubmit(validProcesses);
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-md xl:w-6/12 lg:w-7/12 md:w-9/12 w-12/12">
      {processes.map((process, index) => (
        <div key={index} className="flex gap-2 items-center">
          <span className="w-8">P{index + 1}</span>
          <input
            type="number"
            min="0"
            placeholder="Arrival Time"
            className="border p-2 rounded w-full"
            value={process.arrivalTime ?? ""}
            onChange={(e) =>
              updateProcess(index, "arrivalTime", e.target.value)
            }
          />
          <input
            type="number"
            min="0"
            placeholder="Run Time"
            className="border p-2 rounded w-full"
            value={process.runTime ?? ""}
            onChange={(e) => updateProcess(index, "runTime", e.target.value)}
          />
          <button
            type="button"
            onClick={() => deleteProcess(index)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={addProcess}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Process
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
