"use client";

import { useState } from "react";
import {
  ArrowUpIcon,
  MicIcon,
  PlusIcon,
  SparklesIcon,
  SquareIcon,
} from "lucide-react";

import { VoiceBeam } from "@/components/ui/voice-glow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function VoiceGlowDemo() {
  const [value, setValue] = useState("");
  const [listening, setListening] = useState(false);
  const [processing, setProcessing] = useState(false);

  const hasValue = value.trim().length > 0;

  const handleSend = () => {
    if (!hasValue) return;
    setProcessing(true);
    setTimeout(() => setProcessing(false), 2500);
  };

  return (
    <div className="flex w-full justify-center py-16">
      <div className="w-[680px] max-w-full space-y-3">
        {/* Model picker — di luar input, seperti Gemini */}
        <div className="flex items-center gap-2 px-1">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
          >
            <SparklesIcon className="size-3.5" />
            Agent
            <span className="text-muted-foreground/60">▾</span>
          </button>
        </div>

        {/* VoiceBeam membungkus INPUT CONTAINER (pill), bukan card luar */}
        <VoiceBeam
          colorVariant="mono"
          idle={listening ? 0.45 : processing ? 0.25 : 0.1}
          type="default"
          theme="auto"
          processing={processing}
        >
          <div
            className={cn(
              "relative rounded-[32px] border border-border/60 bg-card",
              "shadow-[0_2px_12px_-2px_rgba(0,0,0,0.06)]",
              "transition-all duration-200",
              "focus-within:border-border focus-within:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)]"
            )}
          >
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={
                listening
                  ? "Listening…"
                  : processing
                    ? "Thinking…"
                    : "Ask anything"
              }
              rows={1}
              className={cn(
                "w-full resize-none bg-transparent px-6 pt-4 pb-2",
                "text-[15px] leading-6 text-foreground",
                "outline-none placeholder:text-muted-foreground/60",
                "min-h-[48px] max-h-[200px] overflow-y-auto"
              )}
            />

            <div className="flex items-center justify-between px-3 pb-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Attach file"
                className="size-10 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <PlusIcon className="size-5" />
              </Button>

              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={listening ? "Stop listening" : "Start listening"}
                  onClick={() => setListening((v) => !v)}
                  className={cn(
                    "size-10 rounded-full",
                    listening
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {listening ? (
                    <SquareIcon className="size-4 fill-current" />
                  ) : (
                    <MicIcon className="size-5" />
                  )}
                </Button>

                <Button
                  type="button"
                  size="icon"
                  aria-label="Send message"
                  disabled={!hasValue}
                  onClick={handleSend}
                  className={cn(
                    "size-10 rounded-full transition-all duration-150",
                    hasValue
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "bg-muted text-muted-foreground/50"
                  )}
                >
                  <ArrowUpIcon className="size-5" />
                </Button>
              </div>
            </div>
          </div>
        </VoiceBeam>

        {/* Transkrip — muncul saat listening / processing, seperti ChatGPT */}
        {(listening || processing) && (
          <div className="rounded-2xl border border-border/40 bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
            {listening && (
              <p className="flex items-center gap-2">
                <span className="size-1.5 animate-pulse rounded-full bg-foreground" />
                Listening… speak now.
              </p>
            )}
            {processing && (
              <p className="flex items-center gap-2">
                <span className="size-1.5 animate-pulse rounded-full bg-foreground" />
                Thinking…
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}