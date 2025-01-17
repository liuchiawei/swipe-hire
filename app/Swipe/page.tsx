"use client";
import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import MatchBtn from "./MatchBtn";
import { Icon } from "@iconify-icon/react";
import { API } from "react-tinder-card";
import FlipCard from "@/components/FlipCard";

interface Job {
  id: number;
  name: string;
  industry: string;
  location: string;
  position: string;
  salary: number;
  description: string;
  requirement: string[];
}

const db: Job[] = [
  {
    id: 1,
    name: "Google",
    industry: "Tech",
    location: "東京",
    position: "ウエブデザイナー",
    salary: 8000000,
    description: "Googleのウエブデザイナーの求人です。",
    requirement: ["HTML", "CSS", "JavaScript"],
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
  },
];

function Swipe() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map(() => React.createRef<API>()),
    []
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction: string, nameToDelete: string, index: number) => {
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    if (currentIndexRef.current >= idx) {
      void childRefs[idx].current.restoreCard();
    }
  };

  const swipe = async (dir: "left" | "right") => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col justify-center items-center gap-4">
      <div className="relative w-[297px] h-[420px] flex justify-center items-center z-10 select-none">
        {db.map((job, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="absolute cursor-grab active:cursor-grabbing bg-cover bg-center w-full h-full"
            key={job.id}
            onSwipe={(dir) => swiped(dir, job.name, index)}
            onCardLeftScreen={() => outOfFrame(job.name, index)}
          >
            <FlipCard job={job} isFlipped={isFlipped} size="lg" />
          </TinderCard>
        ))}
      </div>
      <div className="flex gap-4 z-0">
        <MatchBtn
          className="text-rose-500 hover:bg-rose-500"
          onClick={() => swipe("left")}
          aria-label="Swipe left"
        >
          <Icon icon="line-md:close" width="30" height="30" />
        </MatchBtn>
        <MatchBtn
          className="text-amber-400 hover:bg-amber-400"
          onClick={() => goBack()}
        >
          <Icon icon="ic:baseline-undo" width="30" height="30" />
        </MatchBtn>
        <MatchBtn
          className="text-sky-500 hover:bg-sky-500"
          onClick={handleFlip}
        >
          <Icon icon="line-md:watch-loop" width="30" height="30" />
        </MatchBtn>
        <MatchBtn
          className="text-teal-500 hover:bg-teal-500"
          onClick={() => swipe("right")}
        >
          <Icon
            icon="line-md:star-pulsating-filled-loop"
            width="30"
            height="30"
          />
        </MatchBtn>
      </div>
    </div>
  );
}

export default Swipe;
