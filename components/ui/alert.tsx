import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        info: "border-blue-500/25 bg-blue-500/5 text-foreground [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400 *:data-[slot=alert-description]:text-foreground/70",
        success: "border-emerald-500/25 bg-emerald-500/5 text-foreground [&>svg]:text-emerald-600 dark:[&>svg]:text-emerald-400 *:data-[slot=alert-description]:text-foreground/70",
        warning: "border-amber-500/25 bg-amber-500/5 text-foreground [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400 *:data-[slot=alert-description]:text-foreground/70",
        destructive: "border-red-500/25 bg-red-500/5 text-foreground [&>svg]:text-red-600 dark:[&>svg]:text-red-400 *:data-[slot=alert-description]:text-foreground/70",
      },
    },
  }
);

const Alert = ({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) => (
  <div
    data-slot="alert"
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
);

const AlertTitle = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="alert-title"
    className={cn(
      "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
      className
    )}
    {...props}
  />
);

const AlertDescription = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    data-slot="alert-description"
    className={cn(
      "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
      className
    )}
    {...props}
  />
);

export { Alert, AlertDescription, AlertTitle };