import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative mx-auto flex w-fit items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm backdrop-blur-sm transition-shadow duration-500 ease-out hover:shadow-[inset_0_-8px_10px_#a855f733]",
        className
      )}
    >
      <span
        className="inline animate-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-[length:200%_100%] bg-clip-text text-transparent"
        style={{ backgroundSize: "200% auto" }}
      >
        {children}
      </span>
    </div>
  );
}
