"use client";
import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import MatchBtn from "./MatchBtn";
import { Icon } from "@iconify-icon/react";
import { API } from "react-tinder-card";
import FlipCard from "@/components/FlipCard";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: number;
  description: string;
}

const db: Job[] = [
  {
    id: 1,
    title: "ウエブデザイナー",
    company: "Google",
    location: "東京",
    salary: 8000000,
    description: "Googleのウエブデザイナーの求人です。",
  },
  {
    id: 2,
    title: "エンジニア",
    company: "Amazon",
    location: "大阪",
    salary: 7000000,
    description: "Amazonのエンジニアの求人です。",
  },
  {
    id: 3,
    title: "UI/UX デザイナー",
    company: "Facebook",
    location: "福岡",
    salary: 7500000,
    description: "FacebookのUI/UX デザイナーの求人です。",
  },
  {
    id: 4,
    title: "プロダクトマネージャー",
    company: "Apple",
    location: "名古屋",
    salary: 9000000,
    description: "Appleのプロダクトマネージャーの求人です。",
  },
  {
    id: 5,
    title: "データサイエンティスト",
    company: "Tesla",
    location: "東京",
    salary: 10000000,
    description: "Teslaのデータサイエンティストの求人です。",
  },
  {
    id: 6,
    title: "データサイエンティスト",
    company: "Sony",
    location: "東京",
    salary: 10000000,
    description: "Sonyのデータサイエンティストの求人です。",
  },
  {
    id: 7,
    title: "データサイエンティスト",
    company: "Microsoft",
    location: "東京",
    salary: 10000000,
    description: "Microsoftのデータサイエンティストの求人です。",
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
            onSwipe={(dir) => swiped(dir, job.title, index)}
            onCardLeftScreen={() => outOfFrame(job.title, index)}
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
