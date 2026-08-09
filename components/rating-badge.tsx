import { cn } from "@/lib/utils";

type Rating = "g" | "r";

const labels: Record<Rating, string> = {
  g: "Rated G!",
  r: "Rated R!",
};

export function RatingBadge({ rating }: { rating: Rating }) {
  return (
    <span
      className={cn(
        "comic-bubble font-display text-base text-primary-foreground",
        rating === "g" ? "bg-rating-g" : "bg-rating-r",
      )}
    >
      {labels[rating]}
    </span>
  );
}
