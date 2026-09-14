// shared/components/ProgressBar.tsx
//
// Reusable across ModuleCard and the module detail page — one visual
// definition of "what a progress bar looks like" in this app.

type ProgressBarProps = {
  percent: number; // 0-100
};

export function ProgressBar({ percent }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <div className="w-full h-1.5 rounded-full bg-[var(--color-muted)] overflow-hidden">
      <div
        className="h-full rounded-full bg-[var(--color-nature-500)] transition-all"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
