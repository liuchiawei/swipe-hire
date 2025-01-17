"use client";

import FlipCard from "@/components/FlipCard";
import Divider from "@mui/material/Divider";
import { useState } from "react";

interface Job {
  id: number;
  name: string;
  industry: string;
  location: string;
  position: string;
  salary: number;
  description: string;
  requirement: string[];
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
    name: "Google",
    industry: "Tech",
    location: "東京",
    position: "ウエブデザイナー",
    salary: 8000000,
    description: "Googleのウエブデザイナーの求人です。",
    requirement: ["HTML", "CSS", "JavaScript"],
    isFlipped: false,
  },
  {
    id: 2,
    name: "Amazon",
    industry: "Tech",
    location: "大阪",
    position: "エンジニア",
    salary: 7000000,
    description: "Amazonのエンジニアの求人です。",
    requirement: ["HTML", "CSS", "JavaScript"],
    isFlipped: false,
  },
  {
    id: 3,
    name: "Facebook",
    industry: "Tech",
    location: "福岡",
    position: "UI/UX デザイナー",
    salary: 7500000,
    description: "FacebookのUI/UX デザイナーの求人です。",
    requirement: ["HTML", "CSS", "JavaScript"],
    isFlipped: false,
  },
  {
    id: 4,
    name: "Apple",
    industry: "Tech",
    location: "名古屋",
    position: "プロダクトマネージャー",
    salary: 9000000,
    description: "Appleのプロダクトマネージャーの求人です。",
    requirement: ["HTML", "CSS", "JavaScript"],
    isFlipped: false,
  },
  {
    id: 5,
    name: "Tesla",
    industry: "Tech",
    location: "東京",
    position: "データサイエンティスト",
    salary: 10000000,
    description: "Teslaのデータサイエンティストの求人です。",
    requirement: ["HTML", "CSS", "JavaScript"],
    isFlipped: false,
  },
  {
    id: 6,
    name: "Sony",
    industry: "Tech",
    location: "東京",
    position: "データサイエンティスト",
    salary: 10000000,
    description: "Sonyのデータサイエンティストの求人です。",
    requirement: ["HTML", "CSS", "JavaScript"],
    isFlipped: false,
  },
  {
    id: 7,
    name: "Microsoft",
    industry: "Tech",
    location: "東京",
    position: "データサイエンティスト",
    salary: 10000000,
    description: "Microsoftのデータサイエンティストの求人です。",
    requirement: ["HTML", "CSS", "JavaScript"],
    isFlipped: false,
  },
];
