import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: number;
  description: string;
  isFlipped: boolean;
}

export default function Discover() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center pt-8 pb-4 gap-2">
        <h1 className="text-3xl font-bold">Swipe Hire</h1>
        <h2 className="text-md text-neutral-500">夢の仕事を見つけよう！</h2>
      </div>
      <BentoGrid className="w-full p-4 mx-auto">
        {db.map((item, i) => (
          <BentoGridItem
            key={item.id}
            title={item.company}
            description={item.description}
            id={item.id}
            className={i % 7 === 0 ? "md:col-span-2 md:row-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

const db: Job[] = [
  {
    id: 1,
    title: "ウエブデザイナー",
    company: "Google",
    location: "東京",
    salary: 8000000,
    description: "Googleのウエブデザイナーの求人です。",
    isFlipped: false,
  },
  {
    id: 2,
    title: "エンジニア",
    company: "Amazon",
    location: "大阪",
    salary: 7000000,
    description: "Amazonのエンジニアの求人です。",
    isFlipped: false,
  },
  {
    id: 3,
    title: "UI/UX デザイナー",
    company: "Facebook",
    location: "福岡",
    salary: 7500000,
    description: "FacebookのUI/UX デザイナーの求人です。",
    isFlipped: false,
  },
  {
    id: 4,
    title: "プロダクトマネージャー",
    company: "Apple",
    location: "名古屋",
    salary: 9000000,
    description: "Appleのプロダクトマネージャーの求人です。",
    isFlipped: false,
  },
  {
    id: 5,
    title: "データサイエンティスト",
    company: "Tesla",
    location: "東京",
    salary: 10000000,
    description: "Teslaのデータサイエンティストの求人です。",
    isFlipped: false,
  },
  {
    id: 6,
    title: "データサイエンティスト",
    company: "Sony",
    location: "東京",
    salary: 10000000,
    description: "Sonyのデータサイエンティストの求人です。",
    isFlipped: false,
  },
  {
    id: 7,
    title: "データサイエンティスト",
    company: "Microsoft",
    location: "東京",
    salary: 10000000,
    description: "Microsoftのデータサイエンティストの求人です。",
    isFlipped: false,
  },
  {
    id: 8,
    title: "データサイエンティスト",
    company: "チームラボ",
    location: "東京",
    salary: 10000000,
    description: "チームラボのデータサイエンティストの求人です。",
    isFlipped: false,
  },
];
