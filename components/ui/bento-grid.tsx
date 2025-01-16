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
  title,
  description,
  id,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  id?: number;
}) => {
  return (
    <Link href={`/Profile/${id}`} className={cn(
        "rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:bg-black bg-white justify-between flex flex-col hover:-translate-y-2 overflow-hidden",
        className
      )}
    >
      <div className="flex flex-1 w-full h-full min-h-[6rem] relative">
        <Image
          src={`/images/${id}.jpg`}
          alt={`${title}`}
          objectFit="cover"
          objectPosition="center"
          layout="fill"
          className="w-full"
        />
      </div>
      <div className="p-4 group-hover/bento:translate-x-2 transition duration-200">
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
    </Link>
  );
};
