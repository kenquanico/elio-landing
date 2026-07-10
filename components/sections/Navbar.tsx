"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
      <header
          className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
              scrolled
                  ? "border-b border-[#062541]/5 bg-[#f5f5f7] shadow-sm backdrop-blur-xl"
                  : "bg-[#f5f5f7] backdrop-blur-md"
          }`}
      >
        <nav
            className="page-shell flex h-20 items-center justify-between"
            aria-label="Main navigation"
        >
          <a
              href="#home"
              aria-label="Elio home"
              className="shrink-0"
          >
            <Image
                src="/elio-land.svg"
                alt="Elio"
                width={55}
                height={55}
                priority
            />
          </a>

        </nav>
      </header>
  );
}