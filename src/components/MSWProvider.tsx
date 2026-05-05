'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const MSWContext = createContext(false);

export const useMSWReady = () => useContext(MSWContext);

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    import('../mock/browser').then(({ worker }) => {
      worker.start({ onUnhandledRequest: 'bypass' }).then(() => setReady(true));
    });
  }, []);

  if (!ready) return null;

  return <MSWContext.Provider value={ready}>{children}</MSWContext.Provider>;
}
