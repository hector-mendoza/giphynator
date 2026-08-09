import { cn } from "@/lib/utils";

type Rating = "g" | "r";

const labels: Record<Rating, string> = {
  g: "Rated G",
  r: "Rated R",
};

export function RatingBadge({ rating }: { rating: Rating }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-xs font-medium text-primary-foreground",
        rating === "g" ? "bg-rating-g" : "bg-rating-r",
      )}
    >
      {labels[rating]}
    </span>
  );
}
