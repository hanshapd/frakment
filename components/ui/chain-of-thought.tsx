"use client";

import { useEffect, useState } from "react";
import { CircleCheckIcon } from "lucide-react";
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace";

interface ChainOfThoughtProps {
  done?: boolean;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function ChainOfThought({
  done = false,
  defaultOpen = false,
  children,
}: ChainOfThoughtProps) {
  const [open, setOpen] = useState(defaultOpen || !done);

  useEffect(() => {
    if (done) setOpen(false);
  }, [done]);

  return (
    <Trace>
      <TraceCollapsible open={open} onOpenChange={setOpen}>
        {children}
      </TraceCollapsible>
    </Trace>
  );
}

function ChainOfThoughtHeader({ children }: { children: string }) {
  return (
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <CircleCheckIcon />
        </TraceIcon>
        <TraceTitle>{children}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
  );
}

function ChainOfThoughtContent({ children }: { children: React.ReactNode }) {
  return (
    <TraceCollapsibleContent>
      <Trace>{children}</Trace>
    </TraceCollapsibleContent>
  );
}

function ChainOfThoughtStep({ children }: { children: string }) {
  return (
    <TraceLine>
      <TraceIcon>
        <CircleCheckIcon />
      </TraceIcon>
      <TraceTitle>{children}</TraceTitle>
    </TraceLine>
  );
}

export {
  ChainOfThought,
  ChainOfThoughtHeader,
  ChainOfThoughtContent,
  ChainOfThoughtStep,
};