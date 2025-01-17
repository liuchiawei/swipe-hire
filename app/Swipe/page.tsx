"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import { API } from "react-tinder-card";
import FlipCard from "@/components/FlipCard";
import MatchBtn from "./MatchBtn";
import { Icon } from "@iconify-icon/react";

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

function Swipe() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentIndexRef = useRef(currentIndex);

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
  }, []);

  const childRefs = useMemo(
    () =>
      Array(jobs.length)
        .fill(0)
        .map(() => React.createRef<API>()),
    [jobs]
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < jobs.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction: string, nameToDelete: string, index: number) => {
    updateCurrentIndex(index - 1);
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < jobs.length) {
      await childRefs[currentIndex]?.current?.swipe(dir); // Swipe the card!
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
        {jobs.map((job, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="absolute cursor-grab active:cursor-grabbing bg-cover bg-center w-full h-full"
            key={job.id}
            onSwipe={(dir) => swiped(dir, job.name, index)}
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
