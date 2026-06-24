"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import PhoneArtwork from "@/components/ui/PhoneArtwork";
import Sparkle from "@/components/ui/Sparkle";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative min-h-screen pb-12 pt-28 sm:pt-32">
      <div className="page-shell relative grid items-center gap-4 lg:grid-cols-[1.02fr_0.98fr]">
        <Sparkle className="absolute -left-2 top-24 h-7 w-7 rotate-12 text-black lg:-left-6" />
        <Sparkle className="absolute left-[46%] top-2 hidden h-5 w-5 text-black lg:block" />
        <Sparkle className="absolute bottom-20 right-1/2 hidden h-8 w-8 text-black lg:block" />

        <div className="relative z-10 pt-8 lg:pt-0">
          <div className="red-glow absolute -left-20 top-0 -z-10 h-52 w-96 opacity-65" />
          <motion.h1
            className="max-w-[700px] font-display text-hero font-extrabold uppercase text-brand-black"
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Make The Best Financial Decisions
          </motion.h1>
          <motion.p
            className="body-copy mt-7 max-w-[620px]"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.14 }}
          >
            Cum et convallis risus placerat aliquam, nunc. Scelerisque aliquet
            faucibus tincidunt eu adipiscing sociis arcu lorem porttitor.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-5"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            <a
              href="#download"
              className="inline-flex items-center gap-3 rounded-md bg-black px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-red"
            >
              Get Started <span aria-hidden="true">→</span>
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-3 rounded-pill px-2 py-3 text-sm font-semibold"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full border border-black text-xs">
                ▶
              </span>
              Watch Video
            </a>
          </motion.div>

          <motion.div
            className="relative mt-8 hidden w-[390px] sm:block"
            initial={reduceMotion ? false : { opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.35 }}
          >
            <Image
              src="/assets/hero-ribbon.png"
              alt="Uifry make progress ribbon"
              width={1404}
              height={1796}
              sizes="390px"
              className="h-auto w-full"
            />
          </motion.div>
        </div>

        <motion.div
          className="relative z-0 mx-auto w-full max-w-[680px] lg:-mr-16"
          initial={reduceMotion ? false : { opacity: 0, x: 55, rotate: 2 }}
          animate={
            reduceMotion
              ? { opacity: 1 }
              : { opacity: 1, x: 0, rotate: 0, y: [0, -10, 0] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  opacity: { duration: 0.8, delay: 0.18 },
                  x: { duration: 0.8, delay: 0.18 },
                  rotate: { duration: 0.8, delay: 0.18 },
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  },
                }
          }
        >
          <PhoneArtwork
            src="/assets/hero-phones.png"
            alt="Three Uifry app screens showing cards and transaction activity"
            width={1442}
            height={1808}
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
