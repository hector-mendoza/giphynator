import Link from "next/link";

export function RefreshButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[3px_3px_0_var(--foreground)] transition-[transform,background-color,box-shadow] duration-200 hover:bg-primary-hover hover:shadow-[2px_2px_0_var(--foreground)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none motion-reduce:transition-none motion-reduce:hover:shadow-[3px_3px_0_var(--foreground)] motion-reduce:active:translate-x-0 motion-reduce:active:translate-y-0"
    >
      Roll another GIF
    </Link>
  );
}
