export function ComicStar({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M12 1.5l2.8 6.8 7.2.6-5.5 4.7 1.7 7-6.2-3.8-6.2 3.8 1.7-7-5.5-4.7 7.2-.6z" />
    </svg>
  );
}

export function ComicSquiggle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    >
      <path d="M4 14c12-16 24 16 36 0s24 16 36 0 24-16 36 0" />
    </svg>
  );
}
