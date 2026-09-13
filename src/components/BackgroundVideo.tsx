import { useEffect, useRef } from 'react';

const VIDEO_URL =
  'https://res.cloudinary.com/v9ovyghq/video/upload/v1789311324/kling_20260913_VIDEO_animate_4577_0.mp4';
const SENSITIVITY = 0.8;

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  useEffect(() => {
    const handleMove = (currentX: number) => {
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }
      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const video = videoRef.current;
      if (!video || !video.duration || Number.isNaN(video.duration)) {
        return;
      }

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTimeRef.current = Math.min(
        Math.max(0, targetTimeRef.current + timeOffset),
        video.duration
      );

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      handleMove(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) return;

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.02) {
      video.currentTime = targetTimeRef.current;
    } else {
      isSeekingRef.current = false;
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      targetTimeRef.current = video.currentTime || 0;
    }
  };

  return (
    <video
      ref={videoRef}
      src={VIDEO_URL}
      muted
      playsInline
      preload="auto"
      onSeeked={handleSeeked}
      onLoadedMetadata={handleLoadedMetadata}
      className="fixed inset-0 z-0 w-full h-full object-cover select-none pointer-events-none"
      style={{ objectPosition: '70% center' }}
    />
  );
}
