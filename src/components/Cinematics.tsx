"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const videos = [
  {
    id: 1,
    title: "A Love Story",
    category: "Cinematic Reel",
    src: "/downloads/vertical.mp4",
    ratio: "portrait",
  },
  {
    id: 2,
    title: "Dawn of Love",
    category: "Wedding Film",
    src: "/downloads/2026-07-11_03-58-23_UTC.mp4",
    ratio: "landscape",
  },
  {
    id: 3,
    title: "Timeless Vows",
    category: "Cinematic Reel",
    src: "/downloads/2026-08-14_11-58-58_UTC.mp4",
    ratio: "landscape",
  },
  {
    id: 4,
    title: "Grand Celebration",
    category: "Highlight",
    src: "/downloads/2026-08-22_14-03-18_UTC.mp4",
    ratio: "landscape",
  },
];

export default function Cinematics() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const closeVideo = useCallback(() => {
    setActiveVideo(null);
  }, []);

  // Pause modal video on close
  useEffect(() => {
    if (activeVideo === null && modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.removeAttribute("src");
      modalVideoRef.current.load();
    }
  }, [activeVideo]);

  // Keyboard support
  useEffect(() => {
    if (activeVideo === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideo();
      if (e.key === "ArrowRight")
        setActiveVideo((prev) =>
          prev !== null ? (prev + 1) % videos.length : null
        );
      if (e.key === "ArrowLeft")
        setActiveVideo((prev) =>
          prev !== null
            ? (prev - 1 + videos.length) % videos.length
            : null
        );
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [activeVideo, closeVideo]);

  // Scroll animations
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll(".cine-reveal"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 px-6 bg-dark-bg overflow-hidden">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="cine-reveal text-gold text-sm font-semibold uppercase tracking-[0.3em]">
            Cinematic Films
          </span>
          <h2 className="cine-reveal text-4xl md:text-5xl font-bold text-warm-white mt-4">
            Our{" "}
            <span className="italic text-gold">Cinematics</span>
          </h2>
          <p className="cine-reveal text-muted-text text-lg mt-4 max-w-2xl mx-auto">
            Every wedding deserves a feature film. Watch how we transform love
            stories into cinematic masterpieces.
          </p>
        </div>

        {/* Video Grid — 2×2 */}
        <div className="grid md:grid-cols-2 gap-6">
          {videos.map((video, i) => (
            <button
              key={video.id}
              onClick={() => setActiveVideo(i)}
              className="cine-reveal group relative rounded-2xl overflow-hidden cursor-pointer border-0 p-0 text-left"
            >
              {/* Auto-playing muted video thumbnail + container aspect follows the video orientation */}
              <div className={`relative ${video.ratio === "portrait" ? "aspect-[9/16] mx-auto w-full max-w-[240px]" : "aspect-video"}`}>
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black">
                  <video
                    src={video.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-contain -rotate-90 transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 group-hover:from-black/90 transition-all duration-500" />

                {/* Category badge */}
                <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
                  <span className="bg-gold/90 text-dark-bg text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {video.category}
                  </span>
                </div>

                {/* Title at bottom */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-6">
                  <h3 className="text-white font-bold text-lg md:text-xl leading-tight drop-shadow-lg">
                    {video.title}
                  </h3>
                  <p className="text-white/50 text-sm mt-1">
                    {video.category}
                  </p>
                  <span className="inline-block mt-2 text-gold text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click here ↓
                  </span>
                </div>
              </div>

              {/* Gold border on hover */}
              <div className="absolute inset-0 rounded-2xl border border-gold/0 group-hover:border-gold/30 transition-colors duration-500 z-20 pointer-events-none" />
            </button>
          ))}
        </div>
      </div>

      {/* Video Modal — plays unmuted with controls */}
      {activeVideo !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeVideo}
        >
          {/* Close button */}
          <button
            onClick={closeVideo}
            className="absolute top-6 right-6 z-[110] w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Video Player */}
          <div
            className="relative w-full max-w-5xl mx-4 md:mx-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-xl overflow-hidden bg-black">
              <video
                ref={modalVideoRef}
                key={videos[activeVideo].src}
                src={videos[activeVideo].src}
                autoPlay
                controls
                className="w-full max-h-[80vh] object-contain -rotate-90"
              />
            </div>

            {/* Video info + navigation */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-white font-semibold text-lg">
                  {videos[activeVideo].title}
                </p>
                <p className="text-white/50 text-sm">
                  {videos[activeVideo].category}
                </p>
              </div>

              {/* Prev / Next */}
              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveVideo(
                      (activeVideo - 1 + videos.length) % videos.length
                    );
                  }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                  aria-label="Previous video"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveVideo((activeVideo + 1) % videos.length);
                  }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                  aria-label="Next video"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
