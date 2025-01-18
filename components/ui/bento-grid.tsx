import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  company,
  industry,
  position,
  id,
}: {
  className?: string;
  company?: string | React.ReactNode;
  industry?: string | React.ReactNode;
  position?: string | React.ReactNode;
  id?: number;
}) => {
  return (
    <Link
      href={`/Jobs/${id}`}
      className={cn(
        "rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:bg-black bg-white justify-between flex flex-col hover:-translate-y-2 overflow-hidden",
        className
      )}
    >
      <div className="flex flex-1 w-full h-full min-h-[6rem] relative">
        <Image
          src={`/images/${id}.jpg`}
          alt={`${company}`}
          objectFit="cover"
          objectPosition="center"
          layout="fill"
          className="w-full"
        />
      </div>
      <div className="p-4 group-hover/bento:translate-x-2 transition duration-200">
        <div className="font-sans text-xs text-neutral-300 dark:text-neutral-300">
          {industry}
        </div>
        <div className="font-bold text-lg text-neutral-600 dark:text-neutral-200 mb-2">
          {company}
        </div>
        <div className="font-sans font-normal text-neutral-500 text-sm dark:text-neutral-300">
          {position}
        </div>
      </div>
    </Link>
  );
};
