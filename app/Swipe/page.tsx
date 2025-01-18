"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import { API } from "react-tinder-card";
import FlipCard from "@/components/FlipCard";
import MatchBtn from "./MatchBtn";
import { Icon } from "@iconify-icon/react";
import { Loader2 } from "lucide-react";

interface Job {
  id: number;
  company: string;
  industry: string;
  location: string;
  position: string;
  salary: number;
  description: string;
  requirement: string[];
}

export default function Swipe() {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const currentIndexRef = useRef(currentIndex);
  const canGoBack = currentIndex < (jobs?.length ?? 0) - 1;
  const canSwipe = currentIndex >= 0;

  // カードデータの初期化
  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("/api/jobs");
        const fetchedJobs = await response.json();
        setJobs(fetchedJobs);
        setCurrentIndex(fetchedJobs.length - 1);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }
    fetchJobs();
    setIsMounted(true);
  }, []);

  // カードの参照を作成
  const childRefs = useMemo(() => {
    if (!jobs) return [];
    return Array(jobs.length)
      .fill(0)
      .map(() => React.createRef<API>());
  }, [jobs]);

  // カードのインデックスを更新する関数
  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  /** 
  @function swipe
  @description: クリックすると右、左にスワイプする関数
  */
  const swipe = async (dir: string) => {
    if (!jobs || !canSwipe || currentIndex >= jobs.length) {
      return;
    } else if (canSwipe && currentIndex < jobs.length) {
      await childRefs[currentIndex]?.current?.swipe(dir); // Swipe the card!
    }
  };

  /** 
  @function swiped
  @description: スワイプしたら右、左に判断する関数
  */
  const swiped = (direction: string, nameToDelete: string, index: number) => {
    if (!jobs || !canSwipe || currentIndex >= jobs.length) {
      return;
    } else if (canSwipe && currentIndex < jobs.length) {
      updateCurrentIndex(index - 1);
      if (direction === "right") {
        console.log("right");
        // 右にスワイプしたら、データベースに気に入ったものを保存（collected, viewed）
        // viewed()
        // collected()
      } else if (direction === "left") {
        console.log("left");
        // 左にスワイプしたら、データベースに気に入らないものを保存（uncollected, viewed）
        // viewed()
        // uncollected()
      }
    }
  };

  // TODO: swiped()の中にviewed(), collected(), uncollected()を実装する
  /** 
  @function viewed
  @description: データベースにviewedを保存する関数
  */
  // const viewed = async () => {
  //   // データベースにviewedを保存する
  // }

  /** 
  @function collected
  @description: データベースにcollectedを保存する関数
  */
  // const collected = async () => {
  //   // データベースにcollectedを保存する
  // }

  /** 
  @function uncollected
  @description: データベースにuncollectedを保存する関数
  */
  // const uncollected = async () => {
  //   // データベースにuncollectedを保存する
  // }

  /** 
  @function goBack
  @description: 前のカードに戻る関数
  */
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  /** 
  @function handleFlip
  @description: カードを裏返す関数
  */
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  
  return (
    <div className="h-screen w-full overflow-hidden flex flex-col justify-center items-center gap-4">
      <div className="relative w-[297px] h-[420px] flex justify-center items-center z-10 select-none">
        {isMounted ? (
          jobs &&
          jobs.map((job, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="absolute cursor-grab active:cursor-grabbing bg-cover bg-center w-full h-full"
              key={job.id}
              onSwipe={(dir) => swiped(dir, job.company, index)}
            >
              <FlipCard job={job} isFlipped={isFlipped} size="lg" />
            </TinderCard>
          ))
        ) : (
          // TODO: データがない場合はローディング画面を表示する
          <Loader2 className="animate-spin text-neutral-700" />
        )}
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