import React from "react";
import TinderCard from "react-tinder-card";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
}

interface CardProps {
  job: Job;
  onSwipe: (direction: string, jobId: number, jobTitle: string) => void;
  onOutOfFrame: (jobTitle: string) => void;
}

const JobCard: React.FC<CardProps> = ({ job, onSwipe, onOutOfFrame }) => {
  return (
    <TinderCard
      className="absolute w-[300px] h-[400px] rounded-3xl shadow-xl bg-gradient-to-b from-cyan-500 to-blue-500 rounded-3xl p-6 cursor-grab active:cursor-grabbing0"
      key={job.id}
      onSwipe={(dir) => onSwipe(dir, job.id, job.title)}
      onCardLeftScreen={() => onOutOfFrame(job.title)}
      preventSwipe={["up", "down"]}
    >
      <div className="flex flex-col justify-end items-left h-full">
        <h1 className="text-4xl font-bold mb-2">{job.company}</h1>
        <h2 className="text-lg font-bold mb-4">{job.title}</h2>
        <p className="mb-2">{job.location}</p>
      </div>
    </TinderCard>
  );
};

export default JobCard;