"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const GRID_IMAGES = [
  "/downloads/wedding.jpg",
  "/downloads/prewedding.jpg",
  "/downloads/enagement.jpg",
  "/downloads/maternity.jpg",
  "/downloads/baby.jpg",
  "/downloads/familyshoot.jpg",
  "/downloads/photoshoots.jpg",
  "/downloads/reception.jpg",
  "/downloads/sangeeth.jpg",
  "/downloads/2024-03-09_13-00-08_UTC_1.jpg",
  "/downloads/2024-03-09_13-00-08_UTC_2.jpg",
  "/downloads/2024-03-09_13-00-08_UTC_4.jpg",
  "/downloads/2024-03-09_13-00-08_UTC_5.jpg",
  "/downloads/2024-03-09_13-00-08_UTC_6.jpg",
  "/downloads/2024-03-09_13-00-08_UTC_8.jpg",
  "/downloads/2024-03-19_06-37-07_UTC_1.jpg",
  "/downloads/2024-03-19_06-37-07_UTC_2.jpg",
  "/downloads/2024-03-19_06-37-07_UTC_3.jpg",
  "/downloads/2024-04-04_18-02-09_UTC_1.jpg",
  "/downloads/2024-04-04_18-02-09_UTC_2.jpg",
  "/downloads/2024-06-20_17-47-30_UTC_1.jpg",
  "/downloads/2024-06-20_17-47-30_UTC_2.jpg",
  "/downloads/2024-08-10_16-05-49_UTC_2.jpg",
  "/downloads/2024-08-10_16-05-49_UTC_4.jpg",
];

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      contentRef.current.querySelectorAll(".hero-reveal"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out" }
    );
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden"
    >
      {/* Photo Grid Background */}
      <div
        className="absolute inset-0 z-0 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
        style={{ gap: 0 }}
      >
        {GRID_IMAGES.map((src, i) => (
          <div
            key={i}
            style={{ overflow: "hidden", background: "#1a1714", aspectRatio: "3/4" }}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: "brightness(0.55)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Cinematic Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/70 via-dark-bg/40 to-dark-bg/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/30 to-transparent" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,13,15,0.5)_100%)]" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center gap-8 px-6 text-center"
      >
        {/* Decorative Line */}
        <div className="hero-reveal w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        {/* Wordmark */}
        <div className="hero-reveal text-center">
          <h1 className="chrome-text text-[clamp(2.4rem,8vw,4.5rem)] font-bold tracking-tight">
            Mr. Portrait&apos;s
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.5em] pl-[0.5em] text-warm-white/80">
            Photography · Eluru
          </p>
        </div>

        {/* Statement */}
        <p className="hero-reveal text-silver-glow text-lg sm:text-xl md:text-2xl max-w-3xl font-light leading-relaxed tracking-wide italic">
          &ldquo;Every frame tells a story — crafted with care, creativity, and
          a signature touch.&rdquo;
        </p>

        {/* Decorative Line */}
        <div className="hero-reveal w-24 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        {/* Split Pathway CTAs */}
        <div className="hero-reveal flex flex-col items-center gap-5 sm:flex-row mt-4">
          <a
            href="#portfolio"
            className="btn-silver group relative px-10 py-4 text-base font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Explore Wedding Portfolio</span>
            <div className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
          <a
            href="#contact"
            className="btn-silver-outline group relative px-10 py-4 text-base font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Book Now</span>
            <div className="absolute inset-0 bg-gold/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border border-gold/30 flex items-start justify-center pt-2">
          <div className="w-1 h-2.5 rounded-full bg-gold/60 animate-pulse" />
        </div>
      </div>
    </section>
  );
}