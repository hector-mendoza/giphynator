import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function BentoGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid w-full auto-rows-[16rem] grid-cols-1 gap-4 md:grid-cols-3", className)}>
      {children}
    </div>
  );
}

export function BentoCard({
  name,
  className,
  icon,
  description,
  href,
  cta,
}: {
  name: string;
  className?: string;
  icon?: ReactNode;
  description: string;
  href?: string;
  cta?: string;
}) {
  const content = (
    <div
      className={cn(
        "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-purple-400/40 hover:bg-white/[0.06]",
        className
      )}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple-500/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10 flex flex-col gap-2">
        {icon}
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        <p className="max-w-lg text-sm text-muted-foreground">{description}</p>
      </div>
      {cta && (
        <span className="relative z-10 mt-4 flex items-center text-sm font-medium text-purple-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {cta} →
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="contents">
        {content}
      </a>
    );
  }

  return content;
}
