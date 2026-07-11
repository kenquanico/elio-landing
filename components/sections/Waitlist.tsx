"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

const INTRO_EASE: [number, number, number, number] = [0.18, 0.88, 0.24, 1];
const SOFT_EASE: [number, number, number, number] = [0.2, 0.78, 0.24, 1];

type WaitlistModalProps = {
    open: boolean;
    onClose: () => void;
};

export default function WaitlistModal({ open, onClose }: WaitlistModalProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<FormStatus>("idle");
    const inputRef = useRef<HTMLInputElement>(null);

    // Close on Escape
    useEffect(() => {
        if (!open) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    // Lock body scroll while open
    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    // Autofocus the email input, reset state when reopened
    useEffect(() => {
        if (open) {
            setStatus("idle");
            setEmail("");
            const timer = setTimeout(() => inputRef.current?.focus(), 150);
            return () => clearTimeout(timer);
        }
    }, [open]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const cleanEmail = email.trim().toLowerCase();
        if (!cleanEmail) return;

        setStatus("submitting");

        try {
            const response = await fetch("https://formspree.io/f/meebyywz", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    email: cleanEmail,
                    source: "Elio website waitlist",
                }),
            });

            if (!response.ok) {
                throw new Error("Submission failed");
            }

            setEmail("");
            setStatus("success");
        } catch {
            setStatus("error");
        }
    }

    return (
        <AnimatePresence>
            {open ? (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center px-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.32, ease: SOFT_EASE }}
                >
                    {/* Backdrop */}
                    <motion.button
                        type="button"
                        aria-label="Close waitlist modal"
                        onClick={onClose}
                        className="absolute inset-0 bg-black/30 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.36, ease: SOFT_EASE }}
                    />

                    {/* Modal card */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="waitlist-modal-heading"
                        initial={{
                            opacity: 0,
                            y: 28,
                            scale: 0.96,
                            filter: "blur(20px)",
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            filter: "blur(0px)",
                        }}
                        exit={{
                            opacity: 0,
                            y: 16,
                            scale: 0.97,
                            filter: "blur(14px)",
                        }}
                        transition={{
                            opacity: { duration: 0.4, ease: SOFT_EASE },
                            y: { duration: 0.5, ease: INTRO_EASE },
                            scale: { duration: 0.5, ease: INTRO_EASE },
                            filter: { duration: 0.5, ease: INTRO_EASE },
                        }}
                        className="relative w-full max-w-[440px] overflow-hidden rounded-[30px] bg-white p-8 shadow-[0_30px_70px_-30px_rgba(6,37,65,0.55)] sm:p-9"
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-[#e8e8ed] text-[#6e6e73] transition-colors duration-300 hover:bg-[#d2d2d7] hover:text-[#1d1d1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
                        >
                            <X aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.25} />
                        </button>

                        {status === "success" ? (
                            <div className="pt-1">
                                <h2
                                    id="waitlist-modal-heading"
                                    className="max-w-[300px] font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.04em] text-[#1d1d1f] sm:text-[28px]"
                                >
                                    You&rsquo;re on the list.
                                </h2>

                                <p className="mt-3 max-w-[320px] text-[15px] leading-[1.55] text-[#5f6065]">
                                    We&rsquo;ll email you as soon as Elio beta access opens up.
                                </p>

                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="mt-7 inline-flex h-12 items-center rounded-full bg-black px-6 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
                                >
                                    Done
                                </button>
                            </div>
                        ) : (
                            <>
                                <p className="pr-8 text-[14px] font-semibold leading-none text-[#0066cc]">
                                    Join the waitlist
                                </p>

                                <h2
                                    id="waitlist-modal-heading"
                                    className="mt-4 max-w-[320px] font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.04em] text-[#1d1d1f] sm:text-[28px]"
                                >
                                    Be first to try Elio.
                                </h2>

                                <p className="mt-3 max-w-[340px] text-[15px] leading-[1.55] text-[#5f6065]">
                                    Leave your email and we&rsquo;ll let you know the moment beta access is ready.
                                </p>

                                <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-3">
                                    <label htmlFor="waitlist-modal-email" className="sr-only">
                                        Email address
                                    </label>

                                    <input
                                        ref={inputRef}
                                        id="waitlist-modal-email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        placeholder="Enter your email"
                                        autoComplete="email"
                                        required
                                        disabled={status === "submitting"}
                                        className="min-h-14 w-full rounded-full border border-black/10 bg-white px-6 text-[16px] text-black outline-none transition focus:border-black/30 focus:ring-4 focus:ring-black/5 disabled:cursor-not-allowed disabled:opacity-60"
                                    />

                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="min-h-14 w-full rounded-full bg-black px-7 text-[15px] font-semibold text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {status === "submitting" ? "Joining..." : "Join waitlist"}
                                    </button>
                                </form>

                                {status === "error" && (
                                    <p role="alert" className="mt-3 text-[13px] text-red-600">
                                        We couldn&rsquo;t add your email. Please try again.
                                    </p>
                                )}

                                <p className="mt-4 text-[13px] text-black/45">
                                    Beta invitations and important Elio updates only.
                                </p>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}