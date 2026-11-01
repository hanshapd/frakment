"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";

import type { HeartHandshakeIconHandle } from "@/components/animated-icons/heart-handshake";
import { HeartHandshakeIcon } from "@/components/animated-icons/heart-handshake";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export const SponsorLink = () => {
  const heartRef = useRef<HeartHandshakeIconHandle>(null);

  const handleMouseEnter = useCallback(() => {
    heartRef.current?.startAnimation();
  }, []);

  const handleMouseLeave = useCallback(() => {
    heartRef.current?.stopAnimation();
  }, []);

  return (
    <Button
      asChild
      size="sm"
      variant="ghost"
      className="max-sm:size-8"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={ROUTES.SPONSOR} className="inline-flex items-center gap-1.5">
        <HeartHandshakeIcon className="size-5 sm:size-4.5 text-pink-500" ref={heartRef} />
        <span className="max-sm:sr-only">Sponsor</span>
      </Link>
    </Button>
  );
};
