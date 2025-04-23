// app/providers.tsx
"use client";

import StoreProvider from "./StoreProvider";

export function GlobalProviders({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}
