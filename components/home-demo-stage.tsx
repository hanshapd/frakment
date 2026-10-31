"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BubbleContent,
  BubbleReactions,
  bubbleVariants,
} from "@/components/ui/bubble";
import { Marker, MarkerContent } from "@/components/ui/marker";
import {
  Message,
  MessageContent,
  MessageFooter,
} from "@/components/ui/message";
import { ChainOfThoughtDemo } from "@/examples/chain-of-thought-demo";
import { TerminalDemo } from "@/examples/terminal-demo";
import { cn } from "@/lib/utils";

const TYPE_SPEED = 18;
const TYPE_START = 250;
const TYPE_BUFFER = 200;

const typeDuration = (text: string) =>
  TYPE_START + text.length * TYPE_SPEED + TYPE_BUFFER;

const Typewriter = ({ text }: { text: string }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    setCount(0);
    setStarted(false);
    const t = setTimeout(() => setStarted(true), TYPE_START);
    return () => clearTimeout(t);
  }, [text]);
  useEffect(() => {
    if (!started || count >= text.length) {
      return;
    }
    const t = setTimeout(() => setCount((c) => c + 1), TYPE_SPEED);
    return () => clearTimeout(t);
  }, [count, started, text.length]);
  return <>{text.slice(0, count)}</>;
};

const MotionBubble = ({
  align = "start",
  variant = "default",
  hasReaction = false,
  children,
  className,
}: {
  align?: "start" | "end";
  variant?: "default" | "muted";
  hasReaction?: boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    data-slot="bubble"
    data-variant={variant}
    data-align={align}
    initial={{ opacity: 0, x: align === "end" ? 16 : -16, scale: 0.95 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    transition={{ type: "spring", stiffness: 380, damping: 28 }}
    className={cn(
      bubbleVariants({ variant }),
      hasReaction && "mb-4",
      className
    )}
  >
    {children}
  </motion.div>
);

const MotionAvatar = ({
  avatar,
  fallback,
}: {
  avatar: string;
  fallback: string;
}) => (
  <motion.div
    data-slot="message-avatar"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 500, damping: 20 }}
    className="flex w-fit min-w-8 shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-muted group-has-data-[slot=message-footer]/message:-translate-y-8"
  >
    <Avatar>
      <AvatarImage src={avatar} alt="" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  </motion.div>
);

const Reaction = ({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{
      delay: delay / 1000,
      type: "spring",
      stiffness: 400,
      damping: 15,
    }}
  >
    <BubbleReactions>{children}</BubbleReactions>
  </motion.div>
);
const AnimatedMessage = ({
  align = "start",
  variant = "default",
  avatar,
  fallback,
  text,
  delivered = false,
  reaction,
}: {
  align?: "start" | "end";
  variant?: "default" | "muted";
  avatar: string;
  fallback: string;
  text: string;
  delivered?: boolean;
  reaction?: React.ReactNode;
}) => (
  <Message align={align}>
    <MotionAvatar avatar={avatar} fallback={fallback} />
    <MessageContent>
      <MotionBubble align={align} variant={variant} hasReaction={!!reaction}>
        <BubbleContent>
          <Typewriter text={text} />
        </BubbleContent>
        {reaction && <Reaction delay={typeDuration(text)}>{reaction}</Reaction>}
      </MotionBubble>
      {delivered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: typeDuration(text) / 1000 }}
        >
          <MessageFooter>Delivered</MessageFooter>
        </motion.div>
      )}
    </MessageContent>
  </Message>
);

const AnimatedMessageDemo = () => {
  const [tick, setTick] = useState(0);
  const [step, setStep] = useState(0);
  useEffect(() => {
    setStep(0);
    const timers: ReturnType<typeof setTimeout>[] = [
      setTimeout(() => setStep(1), 150),
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 1850),
      setTimeout(() => setStep(4), 2700),
      setTimeout(() => setStep(5), 3550),
      setTimeout(() => setStep(6), 4600),
      setTimeout(() => setTick((t) => t + 1), 6600),
    ];
    return () => {
      for (const id of timers) {
        clearTimeout(id);
      }
    };
  }, [tick]);
  return (
    <div className="flex w-full max-w-sm flex-col gap-3 py-4">
      {step >= 1 && (
        <AnimatedMessage
          align="end"
          avatar="/avatars/female-l-1.avif"
          fallback="ME"
          text="Deploying to prod real quick."
        />
      )}
      {step >= 2 && (
        <AnimatedMessage
          avatar="/avatars/male-r.avif"
          fallback="R"
          variant="muted"
          text="It's 4:55 PM. On a Friday."
        />
      )}
      {step >= 3 && (
        <AnimatedMessage
          align="end"
          avatar="/avatars/female-l-1.avif"
          fallback="ME"
          text="It's a one-line change."
          delivered
        />
      )}
      {step >= 4 && (
        <AnimatedMessage
          avatar="/avatars/male-r.avif"
          fallback="R"
          variant="muted"
          text="It's always a one-line change 😬"
        />
      )}
      {step >= 5 && (
        <AnimatedMessage
          avatar="/avatars/male-r.avif"
          fallback="R"
          variant="muted"
          text="Alright, let me take a look."
          reaction={<span>👍</span>}
        />
      )}
      {step >= 6 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Marker role="status">
            <MarkerContent>
              <span className="font-medium">Oliver</span> is typing...
            </MarkerContent>
          </Marker>
        </motion.div>
      )}
    </div>
  );
};
const AutoLoopChainOfThought = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 10_000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex w-full max-w-sm justify-center [&_button.mt-auto]:hidden">
      <ChainOfThoughtDemo key={tick} />
    </div>
  );
};

const AutoLoopTerminal = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 7200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex w-full max-w-sm justify-center [&_button.mt-auto]:hidden">
      <TerminalDemo key={tick} />
    </div>
  );
};

export const HomeDemoStage = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "flex w-full flex-col items-center gap-x-20 gap-y-12 md:flex-row md:items-start md:justify-center lg:gap-x-24",
      className
    )}
  >
    <AutoLoopTerminal />
    <AnimatedMessageDemo />
    <AutoLoopChainOfThought />
  </div>
);
