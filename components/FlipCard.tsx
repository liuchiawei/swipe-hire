import Image from "next/image";
import ReactCardFlip from "react-card-flip";
import Link from "next/link";

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

interface FlipCardProps {
  job: Job;
  isFlipped: boolean;
  size: "sm" | "lg";
}

export default function FlipCard({ job, isFlipped, size }: FlipCardProps) {
  let width = 0;
  let height = 0;
  let companyFontSize = 0;
  let titleFontSize = 0;
  if (size === "sm") {
    width = 176;
    height = 250;
    companyFontSize = 1.5;
    titleFontSize = 1;
  } else if (size === "lg") {
    width = 297;
    height = 420;
    companyFontSize = 1.75;
    titleFontSize = 1;
  }
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div
        className="flex flex-col justify-end items-left rounded-3xl shadow-xl text-white p-6 bg-cover bg-center overflow-hidden w-full"
        style={{
          backgroundImage: `url('/images/${job.id}.jpg')`,
          height: `${height}px`,
        }}
      >
        {size === "lg" ? (
          <div className="w-full h-full bg-gradient-to-t from-black/90 via-black/20 to-transparent absolute top-0 left-0 rounded-3xl z-0"></div>
        ) : null}
        <h3 className="text-sm text-neutral-100">{job.industry}</h3>
        <h1
          className="font-bold mb-2 drop-shadow-lg"
          style={{
            fontSize: `${companyFontSize}rem`,
          }}
        >
          {job.name}
        </h1>
        <h2
          className="font-bold mb-4 drop-shadow-lg"
          style={{
            fontSize: `${titleFontSize}rem`,
          }}
        >
          {job.position}
        </h2>
        <p className="mb-2 drop-shadow-lg">{job.location}</p>
      </div>
      {size === "lg" ? (
        <div
          className="rounded-3xl shadow-xl bg-white overflow-hidden flex flex-col justify-between"
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          <div className="h-2/5 relative">
            <div className="h-4/5 bg-gradient-to-b from-sky-800 to-emerald-400">
              <Image
                src={`/images/${job.id}.jpg`}
                alt={job.name}
                width={120}
                height={120}
                loading="lazy"
                className="rounded-full w-[120px] h-[120px] shadow-lg object-cover absolute bottom-0 left-1/2 transform -translate-x-1/2"
              />
            </div>
          </div>
          <div className="h-3/5 px-6 pt-2 pb-4 flex flex-col justify-between">
            <div>
              <h1 className="font-bold text-center text-2xl mb-1">
                {job.name}
              </h1>
              <h2 className="text-neutral-500 text-center text-sm">
                {job.position}
              </h2>
            </div>
            <div className="flex flex-col justify-between text-sm">
              <h3 className="mb-2 text-neutral-300">仕事内容</h3>
              <p className="text-neutral-500">{job.description}</p>
            </div>
            <Link
              href={`/Profile/${job.id}`}
              className="bg-primary text-white text-center px-4 py-2 rounded-full hover:bg-primary/90 hover:shadow-md transition-all duration-200"
            >
              詳細を見る
            </Link>
          </div>
        </div>
      ) : (
        <div
          className="w-full rounded-3xl shadow-xl bg-white flex flex-col justify-between items-center overflow-hidden"
          style={{
            height: `${height}px`,
          }}
        >
          <div className="w-full h-2/5 relative">
            <div className="bg-gradient-to-b from-sky-800 to-emerald-400 h-3/4">
              <Image
                src={`/images/${job.id}.jpg`}
                alt={job.name}
                width={80}
                height={80}
                className="rounded-full w-[80px] h-[80px] shadow-lg object-cover absolute bottom-0 left-1/2 transform -translate-x-1/2"
                loading="lazy"
              />
            </div>
          </div>
          <div className="w-full h-3/5 flex flex-col justify-between items-center p-4 gap-2">
            <p className="drop-shadow-lg">{job.description}</p>
            <Link
              href={`/Profile/${job.id}`}
              className="bg-primary text-white text-center w-full py-2 rounded-full hover:bg-primary/90 hover:shadow-md transition-all duration-200"
            >
              詳細を見る
            </Link>
          </div>
        </div>
      )}
    </ReactCardFlip>
  );
}
