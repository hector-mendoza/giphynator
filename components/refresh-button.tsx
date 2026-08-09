"use client";

const buttonClassName =
  "comic-wiggle comic-outline inline-flex w-full items-center justify-center rounded-full bg-primary px-8 py-3.5 font-display text-lg tracking-wide text-primary-foreground comic-shadow transition-[transform,background-color,box-shadow] duration-200 hover:bg-primary-hover hover:shadow-[4px_4px_0_var(--ink-shadow)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none motion-reduce:transition-none motion-reduce:hover:shadow-[5px_5px_0_var(--ink-shadow)] motion-reduce:active:translate-x-0 motion-reduce:active:translate-y-0 sm:w-auto";

export function RefreshButton() {
  function handleRefresh() {
    window.location.reload();
  }

  return (
    <button type="button" onClick={handleRefresh} className={buttonClassName}>
      Roll another GIF!
    </button>
  );
}
