import { cn } from "@/lib/utils";

export function DotPattern({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-white/10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]",
        className
      )}
    >
      <defs>
        <pattern id="dot-pattern" width={20} height={20} patternUnits="userSpaceOnUse">
          <circle cx={1.5} cy={1.5} r={1.5} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-pattern)" />
    </svg>
  );
}
