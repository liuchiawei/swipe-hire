import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { prisma } from "@/lib/prisma";

// ISR, Incremental Static Regeneration
export const revalidate = 60; // 60秒ごとに自動更新

export default async function Discover() {
  const jobs = await prisma.jobs.findMany(); // データベースからデータを取得

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center pt-8 pb-4 gap-2">
        <h1 className="text-3xl font-bold">Swipe Hire</h1>
        <h2 className="text-md text-neutral-500">夢の仕事を見つけよう！</h2>
      </div>
      <BentoGrid className="w-full p-4 mx-auto">
        {jobs.map((item, i) => (
          <BentoGridItem
            key={item.id}
            company={item.company}
            industry={item.industry}
            position={item.position}
            id={item.id}
            className={i % 7 === 0 ? "md:col-span-2 md:row-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
