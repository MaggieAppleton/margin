export const DEMO_RATE = 60;

export type Clock = {
  now: () => number;
  isDemo: () => boolean;
  setDemo: (on: boolean) => void;
};

// Real time by default; in demo mode app time advances DEMO_RATE x real time
// from the moment of enabling.
export function createClock(realNow: () => number = () => Date.now()): Clock {
  let demo: { realStart: number; appStart: number } | null = null;
  return {
    now: () => (demo ? demo.appStart + (realNow() - demo.realStart) * DEMO_RATE : realNow()),
    isDemo: () => demo !== null,
    setDemo: (on) => {
      if (on && !demo) {
        const t = realNow();
        demo = { realStart: t, appStart: t };
      } else if (!on) demo = null;
    },
  };
}
