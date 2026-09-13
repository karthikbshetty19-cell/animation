import { useState, useEffect } from 'react';

interface TypewriterOptions {
  text: string;
  speed?: number;
  startDelay?: number;
}

export function useTypewriter({
  text,
  speed = 38,
  startDelay = 600,
}: TypewriterOptions) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let intervalId: number | null = null;

    setDisplayed('');
    setDone(false);

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index++;
        if (index <= text.length) {
          setDisplayed(text.slice(0, index));
        }
        if (index >= text.length) {
          setDone(true);
          if (intervalId !== null) {
            clearInterval(intervalId);
          }
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
