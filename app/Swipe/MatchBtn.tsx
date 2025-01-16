import { cn } from "@/lib/utils";

export default function MatchBtn({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className={cn(
        "bg-stone-200 shadow-lg w-[48px] h-[48px] flex justify-center items-center rounded-full transition-all duration-300 hover:text-white hover:scale-110",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
