"use client";

import { useEffect } from "react";

type Props = { storeId: string };

export default function StoreTracker({ storeId }: Props) {
  useEffect(() => {
    fetch("/api/analytics/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ storeId }),
    }).catch(() => {});
  }, [storeId]);

  return null;
}
