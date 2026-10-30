"use client";

import * as React from "react";
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
import { cn } from "@/lib/utils";

interface ChainOfThoughtProps extends React.ComponentProps<"div"> {
  defaultOpen?: boolean;
}

function ChainOfThought({
  className,
  defaultOpen = true,
  children,
  ...props
}: ChainOfThoughtProps) {
  return (
    <div
      data-slot="chain-of-thought"
      className={cn("w-full", className)}
      {...props}
    >
      <Trace>
        <TraceCollapsible defaultOpen={defaultOpen}>
          {children}
        </TraceCollapsible>
      </Trace>
    </div>
  );
}

function ChainOfThoughtHeader({
  className,
  children = "Researched in 3 steps",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <CircleCheckIcon />
        </TraceIcon>
        <TraceTitle className={cn(className)} {...props}>
          {children}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
  );
}

function ChainOfThoughtContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <TraceCollapsibleContent className={className} {...props}>
      <Trace className="pt-2">{children}</Trace>
    </TraceCollapsibleContent>
  );
}

function ChainOfThoughtStep({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <TraceLine className={className} {...props}>
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