"use client";

import FlipCard from "@/components/FlipCard";
import Divider from "@mui/material/Divider";
import { useState } from "react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: number;
  description: string;
  isFlipped: boolean;
}

// Main Component
export default function Collections() {
  const [jobs, setJobs] = useState(db);

  const handleFlip = (id: number) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, isFlipped: !job.isFlipped } : job
      )
    );
  };

  return (
    <div className="w-full overflow-hidden p-4">
      <h1 className="text-2xl font-bold text-center my-6">My Collections</h1>
      <Divider />
      <div className="grid grid-cols-2 md:grid-cols-4 justify-center items-center gap-4 p-6">
        {jobs.map((job) => (
          <div
            onClick={() => handleFlip(job.id)}
            key={job.id}
            className="cursor-pointer"
          >
            <FlipCard job={job} isFlipped={job.isFlipped} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}

//
const db: (Job)[] = [
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
];
