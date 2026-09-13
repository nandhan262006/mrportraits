"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  {
    title: "Studio",
    links: [
      { name: "About", href: "#about" },
      { name: "Portfolios", href: "#portfolio" },
      { name: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Candid Photography", href: "#portfolio" },
      { name: "Cinematic Films", href: "#portfolio" },
      { name: "Pre-Wedding", href: "#portfolio" },
      { name: "Traditional Media", href: "#portfolio" },
    ],
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current!.querySelectorAll(".footer-reveal"),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current!,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="border-t border-gold/10 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="footer-reveal space-y-4">
            <div className="select-none">
              <Image
                src="/logo-v2.png"
                alt="Mr. Portrait's Photography"
                width={1679}
                height={417}
                className="h-12 w-auto md:h-14"
              />
            </div>
            <p className="text-muted-text text-sm leading-relaxed">
              Every frame tells a story — crafted with care, creativity, and a
              signature touch. Eluru&apos;s best photographer for weddings,
              portraits, maternity and events across West Godavari.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/mr.portraits_photography"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/10 transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://mrportraitstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/10 transition-all hover:scale-110"
                aria-label="Website"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0a8.949 8.949 0 003-7 8.949 8.949 0 00-3-7 8.949 8.949 0 00-3 7 8.949 8.949 0 003 7zM3.6 9h16.8M3.6 15h16.8"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title} className="footer-reveal">
              <h4 className="text-warm-white font-semibold mb-4">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-text text-sm hover:text-gold transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="footer-reveal mt-16 pt-8 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-text text-sm">
            © {new Date().getFullYear()} Mr. Portrait&apos;s Photography. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-muted-text text-sm hover:text-gold transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-text text-sm hover:text-gold transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
