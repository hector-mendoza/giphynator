"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  background?: string;
}

export function ShimmerButton({
  shimmerColor = "#ffffff",
  background = "linear-gradient(110deg, #a855f7, #ec4899)",
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={
        {
          "--shimmer-color": shimmerColor,
          "--bg": background,
        } as React.CSSProperties
      }
      className={cn(
        "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap rounded-full border border-white/10 px-6 py-2.5 text-sm font-medium text-white [background:var(--bg)] [border-radius:9999px] transition-transform duration-300 hover:scale-105 active:scale-100",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-visible [container-type:size]">
        <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
          <div className="absolute -inset-full w-auto animate-spin-around [background:conic-gradient(from_calc(270deg-45deg),transparent_0,var(--shimmer-color)_90deg,transparent_180deg)] [translate:0_0]" />
        </div>
      </div>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 -z-10 rounded-full opacity-0 shadow-[inset_0_-8px_10px_#ffffff1f] transition-opacity duration-500 group-hover:opacity-100" />
    </button>
  );
}
