import { ProcessResult } from "@/types/result";

export default function ResultTable({
  processes,
}: {
  processes: ProcessResult[];
}) {
  const totalStart = processes.reduce((sum, p) => sum + p.startTime, 0);
  const totalWaiting = processes.reduce((sum, p) => sum + p.waitingTime, 0);
  const totalTurnaround = processes.reduce(
    (sum, p) => sum + p.turnaroundTime,
    0
  );
  const totalRuntime = processes.reduce((sum, p) => sum + p.runTime, 0);

  const avgStart = (totalStart / processes.length).toFixed(2);
  const avgWaiting = (totalWaiting / processes.length).toFixed(2);
  const avgTurnaround = (totalTurnaround / processes.length).toFixed(2);
  const avgRuntime = (totalRuntime / processes.length).toFixed(2);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Process</th>
            <th className="px-4 py-2">Start</th>
            <th className="px-4 py-2">Finish</th>
            <th className="px-4 py-2">Waiting</th>
            <th className="px-4 py-2">Turn-around</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((p, i) => (
            <tr key={i} className="border-t text-center">
              <td className="px-4 py-2">P{p.id}</td>
              <td className="px-4 py-2">{p.startTime}</td>
              <td className="px-4 py-2">{p.finishTime}</td>
              <td className="px-4 py-2">{p.waitingTime}</td>
              <td className="px-4 py-2">{p.turnaroundTime}</td>
            </tr>
          ))}
          <tr className="border-t bg-gray-50 font-semibold text-center">
            <td className="px-4 py-2">Averages</td>
            <td className="px-4 py-2">{avgStart}</td>
            <td className="px-4 py-2">{avgRuntime}</td>
            <td className="px-4 py-2">{avgWaiting}</td>
            <td className="px-4 py-2">{avgTurnaround}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
