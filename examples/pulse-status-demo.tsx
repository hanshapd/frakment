import { PulseStatus } from "@/components/ui/pulse-status";

export function PulseStatusDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-lg border border-border p-4">
      <PulseStatus status="up" />
      <PulseStatus status="degraded" />
      <PulseStatus status="down" />
      <div className="my-2 border-t border-border" />
      <PulseStatus status="degraded" count={2} />
      <PulseStatus status="down" count={1} />
      <PulseStatus status="up" label="All 12 services healthy" />
    </div>
  );
}
