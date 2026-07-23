"use client";

import { cn } from "@/lib/utils";
import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

export function Terminal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "z-0 max-w-2xl w-full rounded-xl border border-white/10 bg-black/60 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex flex-col gap-y-2 border-b border-white/10 p-4">
        <div className="flex flex-row gap-x-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
        </div>
      </div>
      <pre className="p-4">
        <code className="grid gap-y-1 overflow-auto font-mono text-sm">
          {children}
        </code>
      </pre>
    </div>
  );
}

export function AnimatedSpan({
  children,
  delay = 0,
  className,
  ...props
}: { children: ReactNode; delay?: number; className?: string } & MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
      className={cn("grid text-sm", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function TypingAnimation({
  children,
  className,
  duration = 60,
  delay = 0,
}: {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay / 1000 }}
      className={cn("text-sm", className)}
    >
      {children}
    </motion.span>
  );
}
