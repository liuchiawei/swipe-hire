import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface JobPageProps {
  params: { id: string };
}

export default async function JobPage({ params }: JobPageProps) {
  const jobId = parseInt(params.id, 10);
  if (isNaN(jobId)) return notFound(); // 確保 id 是有效的數字

  // 取得職缺資訊
  const job = await prisma.jobs.findUnique({
    where: { id: jobId },
  });

  if (!job) return notFound(); // 若無此職缺，則顯示 404 頁面

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl mx-2 p-10 bg-neutral-100 shadow-lg rounded-none md:rounded-3xl md:m-10 flex flex-col md:flex-row items-center md:items-start gap-6 overflow-hidden relative">
        <div
          className="w-full h-72 bg-cover bg-center brightness-75 absolute top-0 left-0"
          style={{
            backgroundImage: `url('/images/${job.id}.jpg')`,
          }}
        />
        <div
          className="w-[297px] h-[420px] rounded-3xl shadow-xl bg-cover bg-center relative"
          style={{
            backgroundImage: `url('/images/${job.id}.jpg')`,
          }}
        >
          <div className="w-full h-full bg-linear-to-t from-black/90 via-black/20 to-transparent absolute top-0 left-0 rounded-3xl z-0" />
          <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-sm text-neutral-300">{job.industry}</h3>
            <h1 className="font-bold mb-2 drop-shadow-lg text-3xl text-white">
              {job.company}
            </h1>
            <h2 className="font-bold mb-4 drop-shadow-lg text-lg text-white">
              {job.position}
            </h2>
            <p className="mb-2 drop-shadow-lg text-white">{job.location}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 relative z-10 text-white">
          <h1 className="text-3xl font-bold mb-4">{job.company}</h1>
          <h2 className="text-xl text-gray-600 mb-2">{job.industry}</h2>
          <p className="text-gray-500 mb-4">{job.position}</p>
          <p className="text-lg font-semibold text-blue-500 mb-4">
            年収: ¥{job.salary.toLocaleString()}
          </p>
          <p className="text-gray-700">{job.description}</p>
        </div>
      </div>
    </div>
  );
}
