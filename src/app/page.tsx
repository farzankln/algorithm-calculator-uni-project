import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-white relative overflow-hidden p-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-2/12 right-6/12 w-[450px] h-[400px] bg-blue-500 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-1/12 left-4/12 w-[400px] h-[200px] bg-red-500 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-1/12 left-5/12 w-[400px] h-[300px] bg-red-500 rounded-full opacity-30 blur-3xl" />
        <div className="absolute top-2/12 right-3/12 w-[450px] h-[400px] bg-green-500 rounded-full opacity-20 blur-2xl" />
      </div>
      <div className="rounded-2xl px-10 py-8 shadow-2xl bg-white z-10 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-black mb-12 text-center">
          Algorithm Calculator
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/fcfs"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg px-8 py-5 shadow-md transition-transform transform hover:-translate-y-1 text-center"
          >
            FCFS Page
          </Link>
          <Link
            href="/sjf"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg px-8 py-5 shadow-md transition-transform transform hover:-translate-y-1 text-center"
          >
            SJF Page
          </Link>
          <Link
            href="/rr"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg px-8 py-5 shadow-md transition-transform transform hover:-translate-y-1 text-center"
          >
            RR Page
          </Link>
          <Link
            href="/srtf"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg px-8 py-5 shadow-md transition-transform transform hover:-translate-y-1 text-center"
          >
            SRTF Page
          </Link>
          <Link
            href="/hrrn"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg px-8 py-5 shadow-md transition-transform transform hover:-translate-y-1 text-center"
          >
            HRRN Page
          </Link>
        </div>
      </div>
    </div>
  );
}
