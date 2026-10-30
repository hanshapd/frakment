"use client";

import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ComponentPreviewTabsProps {
  component: React.ReactNode;
  source: React.ReactNode;
  className?: string;
  previewClassName?: string;
  hideCode?: boolean;
  align?: "center" | "start" | "end";
}

const transition = {
  duration: 0.22,
  ease: [0.4, 0, 0.2, 1] as const,
};

const variants = {
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  initial: { opacity: 0, y: 6 },
};

export function ComponentPreviewTabs({
  component,
  source,
  className,
  previewClassName,
  hideCode = false,
  align = "center",
}: ComponentPreviewTabsProps) {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">(
    "preview"
  );
  const [isMobileCodeVisible, setIsMobileCodeVisible] = React.useState(false);

  return (
    <div
      className={cn("group relative my-4 flex flex-col gap-2", className)}
      data-slot="component-preview"
    >
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "preview" | "code")}
        className="relative w-full gap-2"
      >
        <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-[3px] text-muted-foreground">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          {!hideCode && <TabsTrigger value="code">Code</TabsTrigger>}
        </TabsList>
      </Tabs>

      <div className="relative">
        <AnimatePresence mode="wait" initial={false}>
          {activeTab === "preview" ? (
            <motion.div
              key="preview"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
              className="relative rounded-md border"
            >
              <div
                data-align={align}
                className={cn(
                  "preview flex w-full justify-center p-10",
                  "data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start",
                  previewClassName ? previewClassName : "min-h-[350px]"
                )}
              >
                {component}
              </div>

              {!hideCode && (
                <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100 md:hidden">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-7 rounded-md px-2 text-xs"
                    onClick={() => {
                      setActiveTab("code");
                      setIsMobileCodeVisible(true);
                    }}
                  >
                    View Code
                  </Button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="code"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
              className="relative"
            >
              {source}
              {isMobileCodeVisible && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mb-2 h-7 rounded-md px-2 text-xs md:hidden"
                  onClick={() => {
                    setIsMobileCodeVisible(false);
                    setActiveTab("preview");
                  }}
                >
                  Hide Code
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
