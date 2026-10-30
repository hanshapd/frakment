"use client";

import { motion } from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const CodeCollapsibleWrapper = ({
  className,
  children,
  navTriggerClassName,
  ...props
}: React.ComponentProps<typeof Collapsible> & {
  navTriggerClassName?: string;
}) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Collapsible
      open={isOpened}
      onOpenChange={setIsOpened}
      className={cn("group/collapsible relative md:-mx-1", className)}
      {...props}
    >
      <CollapsibleTrigger asChild>
        <div
          className={cn(
            "absolute top-1.5 right-9 z-10 flex items-center",
            navTriggerClassName
          )}
        >
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground h-7 rounded-md px-2"
          >
            {isOpened ? "Collapse" : "Expand"}
          </Button>
          <Separator orientation="vertical" className="mx-1.5 h-4!" />
        </div>
      </CollapsibleTrigger>

      <motion.div
        initial={false}
        animate={{
          height: isOpened ? "auto" : 256,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{ overflow: "hidden" }}
        className="relative mt-6 [&>figure]:mt-0 [&>figure]:md:mx-0!"
      >
        {children}
      </motion.div>

      <div className="absolute inset-x-0 -bottom-2 flex h-20 items-center justify-center rounded-b-lg bg-linear-to-b from-code/70 to-code group-data-[state=open]/collapsible:hidden">
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm">
            Expand
          </Button>
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  );
};
