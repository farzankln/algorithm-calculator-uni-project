import { ProcessResult } from "@/types/result";

export default function GanttChart({
  processes,
}: {
  processes: ProcessResult[];
}) {
  return (
    <div className="border mt-6 rounded overflow-x-auto">
      <div className="flex min-w-max">
        {processes.map((process, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center border-r last:border-r-0 bg-blue-600 text-white md:px-4 md:py-2 p-2"
          >
            <div>P{process.id}</div>
            <div className="text-xs whitespace-nowrap">
              {process.startTime} - {process.finishTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
