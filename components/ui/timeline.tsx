import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

function Timeline({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="timeline"
      className={cn("ml-1 border-border border-l", className)}
      {...props}
    />
  );
}

function TimelineItem({
  className,
  children,
  marker,
  ...props
}: React.ComponentProps<"li"> & { marker?: ReactNode }) {
  return (
    <li
      data-slot="timeline-item"
      className={cn("relative pb-2.5 pl-4 text-sm last:pb-0", className)}
      {...props}
    >
      {marker ?? (
        <span className="absolute top-[7px] -left-[3.5px] size-1.5 rounded-full bg-muted-foreground" />
      )}
      {children}
    </li>
  );
}

export { Timeline, TimelineItem };