"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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
      className={`overflow-hidden rounded-card border transition-colors ${
        active
          ? "border-brand-red bg-brand-red text-white"
          : "border-black/10 bg-white text-brand-black"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
        aria-expanded={open}
      >
        <span className="font-display text-lg font-bold sm:text-xl">{title}</span>
        <span className="text-2xl font-light" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <p className="px-6 pb-7 leading-7 text-white/85 sm:px-8">{body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
