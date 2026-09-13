import { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const TYPEWRITER_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?';

const WHITE_PILL_BUTTONS = [
  'Pitch us an idea',
  'Come work here',
  'Send a brief hello',
  'See how we operate',
];

interface HeroProps {
  mounted?: boolean;
}

export function Hero({ mounted = true }: HeroProps) {
  const { displayed, done } = useTypewriter({
    text: TYPEWRITER_TEXT,
    speed: 38,
    startDelay: 600,
  });

  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPillsVisible(true);
    }, 400);

    return () => window.clearTimeout(timer);
  }, []);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText('hello@mainframe.co');
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = 'hello@mainframe.co';
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <section className="relative z-[1] w-full h-[100dvh] min-h-screen flex flex-col justify-end pb-14 sm:pb-16 md:justify-center md:pb-0 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden">
      <div
        className="w-full max-w-xl 2xl:max-w-2xl relative z-10 my-auto md:my-0 pt-16 md:pt-0 transition-all duration-800 delay-100 ease-out"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0px)' : 'translateY(16px)',
        }}
      >
        {/* 1. Blurred intro label */}
        <div
          className="pointer-events-none select-none mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#fff',
            filter: 'blur(4px)',
          }}
        >
          Hey there, meet A.R.I.A,
          <br />
          Mainframe&apos;s Adaptive Response Interface Agent
        </div>

        {/* 2. Typewriter text */}
        <p
          className="text-white mb-5 sm:mb-6 select-text"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: '54px',
          }}
        >
          {displayed}
          {!done && (
            <span
              className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink"
              aria-hidden="true"
            />
          )}
        </p>

        {/* 3. Action pill buttons */}
        <div
          className="flex flex-wrap gap-y-1"
          style={{
            opacity: pillsVisible ? 1 : 0,
            transform: pillsVisible ? 'translateY(0px)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {WHITE_PILL_BUTTONS.map((label) => (
            <button
              key={label}
              type="button"
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer hover:bg-black hover:text-white transition-colors duration-200"
            >
              {label}
            </button>
          ))}

          {/* Outline pill button */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
            title="Click to copy email address"
          >
            <span>
              Reach us: <span className="underline underline-offset-1">hello@mainframe.co</span>
            </span>
            {copied ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium tracking-wide">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                  aria-hidden="true"
                >
                  <path d="M2 6.5l2.5 2.5 5.5-6" />
                </svg>
                Copied
              </span>
            ) : (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
                aria-hidden="true"
              >
                <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
                <path d="M8.5 3.5V1.5a1 1 0 0 0-1-1H1.5a1 1 0 0 0-1 1V7.5a1 1 0 0 0 1 1H3.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 4. Subtle 'Scroll to explore' indicator */}
      <div
        className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none select-none z-10"
        style={{
          opacity: done ? 0.75 : 0,
          transform: `translate(-50%, ${done ? '0px' : '8px'})`,
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
        aria-hidden="true"
      >
        <span className="text-[11px] sm:text-[12px] tracking-[0.18em] uppercase text-white/80 font-normal">
          Scroll to explore
        </span>
        <div className="animate-subtle-float">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/70"
          >
            <path d="M2.5 5.5L7 10l4.5-4.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
