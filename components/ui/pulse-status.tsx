import { CircleCheck, TriangleAlert, X } from "lucide-react";

import { cn } from "@/lib/utils";

export type PulseStatusType = "up" | "degraded" | "down";

const STATUS_CONFIG = {
  degraded: {
    color: "text-amber-600 dark:text-amber-400",
    icon: TriangleAlert,
    label: "Degraded",
  },
  down: {
    color: "text-rose-600 dark:text-rose-400",
    icon: X,
    label: "Outage",
  },
  up: {
    color: "text-emerald-600 dark:text-emerald-400",
    icon: CircleCheck,
    label: "All systems operational",
  },
} as const;

interface PulseStatusProps extends React.ComponentProps<"p"> {
  status: PulseStatusType;
  label?: string;
  count?: number;
}

function PulseStatus({
  status,
  label,
  count,
  className,
  ...props
}: PulseStatusProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;
  const text =
    label ??
    (count === undefined
      ? config.label
      : (count === 1
        ? "1 service affected"
        : `${count} services affected`));

  return (
    <p
      data-slot="pulse-status"
      data-status={status}
      className={cn(
        "flex items-center gap-1.5 text-sm",
        config.color,
        className
      )}
      {...props}
    >
      <Icon aria-hidden className="size-4" />
      {text}
    </p>
  );
}

export { PulseStatus };
