"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type Props = { event: AnalyticsEvent };

export default function AnalyticsTracker({ event }: Props) {
  useEffect(() => {
    track(event);
  }, [event]);

  return null;
}
