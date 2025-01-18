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
    <div className="max-w-4xl mx-auto py-10 px-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{job.company}</h1>
      <h2 className="text-xl text-gray-600 mb-2">{job.industry}</h2>
      <p className="text-gray-500 mb-4">{job.position}</p>
      <p className="text-lg font-semibold text-blue-500 mb-4">
        年収: ¥{job.salary.toLocaleString()}
      </p>
      <p className="text-gray-700">{job.description}</p>
    </div>
  );
}
