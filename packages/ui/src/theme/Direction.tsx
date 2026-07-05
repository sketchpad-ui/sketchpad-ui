'use client';

import { createContext, useContext, useEffect, type ReactNode } from 'react';

type Direction = 'ltr' | 'rtl';

const DirectionContext = createContext<Direction>('ltr');

export function DirectionProvider({
  dir = 'ltr',
  children,
}: {
  dir?: Direction;
  children: ReactNode;
}) {
  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  return <DirectionContext.Provider value={dir}>{children}</DirectionContext.Provider>;
}

export function useDirection() {
  return useContext(DirectionContext);
}
