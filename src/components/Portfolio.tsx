"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  "All",
  "Pre-Weddings",
  "The Big Day",
  "Cinematic Reels",
  "Editorial Fashion",
];

const portfolioItems = [
  // Pre-Weddings
  {
    category: "Pre-Weddings",
    image: "/downloads/prewedding.jpg",
    title: "Misty Mountain Romance",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    category: "Pre-Weddings",
    image: "/downloads/2024-03-09_13-00-08_UTC_1.jpg",
    title: "Golden Promise",
    span: "",
  },
  {
    category: "Pre-Weddings",
    image: "/downloads/2024-03-09_13-00-08_UTC_2.jpg",
    title: "Ethereal Moments",
    span: "",
  },
  {
    category: "Pre-Weddings",
    image: "/downloads/2024-03-09_13-00-08_UTC_4.jpg",
    title: "Sunlit Romance",
    span: "",
  },
  {
    category: "Pre-Weddings",
    image: "/downloads/2024-03-09_13-00-08_UTC_5.jpg",
    title: "Whispered Vows",
    span: "",
  },
  {
    category: "Pre-Weddings",
    image: "/downloads/2024-03-09_13-00-08_UTC_6.jpg",
    title: "Eternal Bond",
    span: "",
  },

  // The Big Day
  {
    category: "The Big Day",
    image: "/downloads/wedding.jpg",
    title: "Blessed Union",
    span: "",
  },
  {
    category: "The Big Day",
    image: "/downloads/2024-03-19_06-37-07_UTC_1.jpg",
    title: "Traditional Elegance",
    span: "",
  },
  {
    category: "The Big Day",
    image: "/downloads/2024-03-19_06-37-07_UTC_2.jpg",
    title: "Royal Celebration",
    span: "",
  },
  {
    category: "The Big Day",
    image: "/downloads/2024-03-19_06-37-07_UTC_3.jpg",
    title: "Grand Entrance",
    span: "",
  },
  {
    category: "The Big Day",
    image: "/downloads/2024-03-19_06-37-07_UTC_4.jpg",
    title: "First Dance",
    span: "",
  },
  {
    category: "The Big Day",
    image: "/downloads/2024-03-19_06-37-07_UTC_5.jpg",
    title: "Dance of Love",
    span: "",
  },
  {
    category: "The Big Day",
    image: "/downloads/2024-04-04_18-02-09_UTC_1.jpg",
    title: "Morning Mist",
    span: "",
  },
  {
    category: "The Big Day",
    image: "/downloads/2024-04-04_18-02-09_UTC_2.jpg",
    title: "Dawn Embrace",
    span: "",
  },
  {
    category: "The Big Day",
    image: "/downloads/2024-06-20_17-47-30_UTC_1.jpg",
    title: "Together Forever",
    span: "",
  },
  {
    category: "The Big Day",
    image: "/downloads/2024-06-20_17-47-30_UTC_2.jpg",
    title: "Grand Celebration",
    span: "",
  },
  {
    category: "The Big Day",
    image: "/downloads/2024-06-20_17-47-30_UTC_3.jpg",
    title: "Divine Rituals",
    span: "",
  },
  {
    category: "The Big Day",
    image: "/downloads/2024-08-10_16-05-49_UTC_1.jpg",
    title: "Joyful Moments",
    span: "",
  },
  {
    category: "The Big Day",
    image: "/downloads/2024-08-10_16-05-49_UTC_2.jpg",
    title: "Eternal Grace",
    span: "",
  },
  {
    category: "The Big Day",
    image: "/downloads/2024-08-10_16-05-49_UTC_3.jpg",
    title: "Final Blessings",
    span: "",
  },

  // Cinematic Reels
  {
    category: "Cinematic Reels",
    image: "/downloads/2024-08-10_16-05-49_UTC_4.jpg",
    title: "Cinematic Vision",
    span: "",
  },
  {
    category: "Cinematic Reels",
    image: "/downloads/2024-08-10_16-05-49_UTC_5.jpg",
    title: "Dramatic Light",
    span: "",
  },
  {
    category: "Cinematic Reels",
    image: "/downloads/2024-08-10_16-05-49_UTC_6.jpg",
    title: "Film Grain",
    span: "",
  },
  {
    category: "Cinematic Reels",
    image: "/downloads/2024-08-30_15-17-01_UTC_1.jpg",
    title: "Motion Poetry",
    span: "",
  },

  // Editorial Fashion
  {
    category: "Editorial Fashion",
    image: "/downloads/2024-08-30_15-17-01_UTC_2.jpg",
    title: "Portrait Legacy",
    span: "md:row-span-2",
  },
  {
    category: "Editorial Fashion",
    image: "/downloads/2024-08-30_15-17-01_UTC_3.jpg",
    title: "Fashion Forward",
    span: "",
  },
  {
    category: "Editorial Fashion",
    image: "/downloads/2024-08-30_15-17-01_UTC_4.jpg",
    title: "Bold Elegance",
    span: "",
  },
  {
    category: "Editorial Fashion",
    image: "/downloads/2024-09-02_16-22-44_UTC_1.jpg",
    title: "Artistic Flair",
    span: "",
  },
  {
    category: "Editorial Fashion",
    image: "/downloads/2024-09-02_16-22-44_UTC_2.jpg",
    title: "Creative Edge",
    span: "",
  },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeFilter === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  // Touch swipe support for lightbox
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;

      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) {
          setLightbox((prev) =>
            prev !== null ? (prev + 1) % filtered.length : null
          );
        } else {
          setLightbox((prev) =>
            prev !== null
              ? (prev - 1 + filtered.length) % filtered.length
              : null
          );
        }
      }

      touchStartX.current = null;
      touchStartY.current = null;
    },
    [filtered.length]
  );

  // Keyboard support for lightbox
  useEffect(() => {
    if (lightbox === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight")
        setLightbox((prev) =>
          prev !== null ? (prev + 1) % filtered.length : null
        );
      if (e.key === "ArrowLeft")
        setLightbox((prev) =>
          prev !== null ? (prev - 1 + filtered.length) % filtered.length : null
        );
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, filtered.length, closeLightbox]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll(".portfolio-header"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
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

  useEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      gridRef.current.children,
      { y: 20, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
      }
    );
  }, [activeFilter]);

  return (
    <section id="portfolio" className="py-24 bg-dark-bg">
      <div ref={sectionRef}>
        {/* Header */}
        <div className="text-center mb-12 px-6">
          <span className="portfolio-header text-gold text-sm font-semibold uppercase tracking-[0.3em]">
            Our Work
          </span>
          <h2 className="portfolio-header text-4xl md:text-5xl font-bold text-warm-white mt-4">
            Portfolios
          </h2>
          <p className="portfolio-header text-muted-text text-lg mt-4 max-w-2xl mx-auto">
            From intimate pre-weddings to grand cinematic productions — explore
            the full spectrum of our craft.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="portfolio-header flex flex-wrap justify-center gap-3 mb-12 px-6">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === tab
                  ? "bg-gold text-dark-bg scale-105"
                  : "border border-warm-white/15 text-muted-text hover:border-gold/40 hover:text-gold"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Masonry Grid — images at natural aspect ratio */}
        <div
          ref={gridRef}
          className="columns-2 md:columns-3 lg:columns-4 px-4 md:px-6 [column-gap:1rem]"
        >
          {filtered.map((item, i) => (
            <button
              key={`${item.category}-${i}`}
              onClick={() => setLightbox(i)}
              className="group relative break-inside-avoid mb-4 p-1 overflow-hidden cursor-pointer border-0 bg-dark-bg rounded-lg"
            >
              {/* Image — natural aspect ratio, no cropping */}
              {/* eslint-disable-next-line @next/next/no-img-element -- masonry columns require intrinsic sizing; next/image has no explicit width/height here */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 z-10" />

              {/* Category badge */}
              <div className="absolute top-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
                <span className="bg-gold/90 text-dark-bg text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {item.category}
                </span>
              </div>

              {/* Title + view icon */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                <div className="flex items-end justify-between">
                  <p className="text-white font-semibold text-sm drop-shadow-lg">
                    {item.title}
                  </p>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Gold border on hover */}
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-colors duration-500 z-20 pointer-events-none rounded-lg" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-[110] w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + filtered.length) % filtered.length);
            }}
            className="absolute left-4 md:left-8 z-[110] w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative max-w-4xl max-h-[85vh] mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- intrinsic containment sizing, no fixed dims */}
            <img
              src={filtered[lightbox].image}
              alt={filtered[lightbox].title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg p-5">
              <p className="text-white font-semibold text-lg">
                {filtered[lightbox].title}
              </p>
              <p className="text-white/60 text-sm">
                {filtered[lightbox].category}
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % filtered.length);
            }}
            className="absolute right-4 md:right-8 z-[110] w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110]">
            <p className="text-white/50 text-sm font-medium">
              {lightbox + 1} / {filtered.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
