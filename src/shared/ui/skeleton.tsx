export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-control bg-neutral-100 [animation-duration:1.2s] ${className}`}
    />
  );
}
