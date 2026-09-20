'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const SRC = '/hero.mp4';
const POSTER = '/hero-poster.jpg';
/* How long the outgoing loop overlaps the incoming one */
const FADE_MS = 600;

/*
  Looping footage behind the hero, fixed to the viewport: the hero content and the
  sections after it scroll up over it while the footage stays put.

  The clip is six seconds with a hard cut at the seam, so two copies are stacked and
  crossfaded: as one nears its end the other starts from zero on top of it. Playback
  pauses when the hero leaves the viewport or the tab is hidden. With reduced motion
  nothing plays and the poster frame stands in. Colour and legibility are handled in
  CSS (desaturate, dim, and a scrim in the page background colour).
*/
export function HeroVideo() {
  const root = useRef<HTMLDivElement>(null);
  const a = useRef<HTMLVideoElement>(null);
  const b = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = root.current;
    const section = el?.closest('section');
    const videos = [a.current, b.current];
    if (!el || !section || !videos[0] || !videos[1]) return;

    let active = 0;
    let swapping = false;
    let visible = false;
    let swapTimer: number | undefined;

    const current = () => videos[active]!;

    const swap = () => {
      const prev = current();
      const next = videos[1 - active]!;
      swapping = true;
      next.currentTime = 0;
      void next.play().catch(() => {});
      next.style.zIndex = '2';
      next.style.transition = `opacity ${FADE_MS}ms linear`;
      next.style.opacity = '1';
      prev.style.zIndex = '1';
      swapTimer = window.setTimeout(() => {
        prev.pause();
        prev.currentTime = 0;
        prev.style.transition = 'none';
        prev.style.opacity = '0';
        active = 1 - active;
        swapping = false;
      }, FADE_MS + 50);
    };

    const onTime = (e: Event) => {
      const v = e.currentTarget as HTMLVideoElement;
      if (v !== current() || swapping || !visible) return;
      if (v.duration && v.currentTime >= v.duration - FADE_MS / 1000) swap();
    };

    const play = () => void current().play().catch(() => {});
    const pause = () => current().pause();

    // The layer is fixed, so watch the hero section it belongs to instead
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        el.toggleAttribute('data-off', !visible);
        if (visible && !document.hidden) play();
        else pause();
      },
      { threshold: 0 }
    );
    const onVisibility = () => (document.hidden ? pause() : visible && play());

    videos.forEach((v) => v!.addEventListener('timeupdate', onTime));
    document.addEventListener('visibilitychange', onVisibility);
    io.observe(section);

    return () => {
      videos.forEach((v) => v!.removeEventListener('timeupdate', onTime));
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      window.clearTimeout(swapTimer);
    };
  }, [reduce]);

  return (
    <div ref={root} aria-hidden className="hero-video">
      <video ref={a} src={SRC} poster={POSTER} muted playsInline preload="auto" style={{ opacity: 1, zIndex: 2 }} />
      <video ref={b} src={SRC} poster={POSTER} muted playsInline preload="auto" style={{ opacity: 0, zIndex: 1 }} />
      <div className="hero-scrim" />
    </div>
  );
}
