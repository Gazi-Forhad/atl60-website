"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Current year, computed on the client. Avoids `new Date()` in the prerendered shell. */
export function Year() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => 2026,
  );
  return <>{year}</>;
}
