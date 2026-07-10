"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

type FAQItemProps = {
  title: string;
  body: string;
  open: boolean;
  onToggle: () => void;
  highlighted?: boolean;
};

export default function FAQItem({
                                  title,
                                  body,
                                  open,
                                  onToggle,
                                  highlighted = false,
                                }: FAQItemProps) {
  const reduceMotion = useReducedMotion();
  const active = open || highlighted;

  return (
      <article
          className={`overflow-hidden rounded-[28px] border transition-colors duration-300 ${
              active
                  ? "border-[#062541] bg-[#062541] text-white"
                  : "border-[#062541]/10 bg-white text-[#062541] hover:border-[#062541]/20 hover:bg-[#FAFAFC]"
          }`}
      >
        <button
            type="button"
            onClick={onToggle}
            className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
            aria-expanded={open}
        >
        <span className="font-display text-lg font-bold tracking-[-0.02em] sm:text-xl">
          {title}
        </span>

          <span
              className={`text-2xl font-light transition-transform duration-300 ${
                  open ? "rotate-180" : ""
              }`}
              aria-hidden="true"
          >
          {open ? "−" : "+"}
        </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
              <motion.div
                  initial={
                    reduceMotion
                        ? false
                        : {
                          height: 0,
                          opacity: 0,
                        }
                  }
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={
                    reduceMotion
                        ? undefined
                        : {
                          height: 0,
                          opacity: 0,
                        }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.28,
                    ease: "easeOut",
                  }}
              >
                <p className="px-6 pb-7 leading-7 text-white/75 sm:px-8">
                  {body}
                </p>
              </motion.div>
          )}
        </AnimatePresence>
      </article>
  );
}