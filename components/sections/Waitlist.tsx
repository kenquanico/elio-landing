"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "framer-motion";

type FormStatus = "idle" | "submitting" | "success" | "error";

type WaitlistModalProps = {
    open: boolean;
    onClose: () => void;
};

const SMOOTH_EASE: [number, number, number, number] = [
    0.16, 1, 0.3, 1,
];

export default function WaitlistModal({
                                          open,
                                          onClose,
                                      }: WaitlistModalProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<FormStatus>("idle");

    const inputRef = useRef<HTMLInputElement>(null);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (!open) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;

        setEmail("");
        setStatus("idle");

        const timer = window.setTimeout(() => {
            inputRef.current?.focus();
        }, reduceMotion ? 50 : 450);

        return () => {
            window.clearTimeout(timer);
        };
    }, [open, reduceMotion]);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        const cleanEmail = email.trim().toLowerCase();

        if (!cleanEmail || status === "submitting") return;

        setStatus("submitting");

        try {
            const response = await fetch(
                "https://formspree.io/f/meebyywz",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        email: cleanEmail,
                        source: "Elio website waitlist",
                    }),
                },
            );

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
            {open && (
                <motion.div
                    className="fixed inset-0 z-[100] flex min-h-[100dvh] items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: reduceMotion ? 0.15 : 0.35,
                        ease: SMOOTH_EASE,
                    }}
                >
                    <motion.button
                        type="button"
                        aria-label="Close waitlist modal"
                        onClick={onClose}
                        className="absolute inset-0 h-full w-full cursor-default bg-black/30"
                        initial={{
                            opacity: 0,
                            backdropFilter: "blur(0px)",
                            WebkitBackdropFilter: "blur(0px)",
                        }}
                        animate={{
                            opacity: 1,
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                        }}
                        exit={{
                            opacity: 0,
                            backdropFilter: "blur(0px)",
                            WebkitBackdropFilter: "blur(0px)",
                        }}
                        transition={{
                            duration: reduceMotion ? 0.15 : 0.5,
                            ease: SMOOTH_EASE,
                        }}
                    />

                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="waitlist-heading"
                        aria-describedby="waitlist-description"
                        initial={
                            reduceMotion
                                ? {
                                    opacity: 0,
                                }
                                : {
                                    opacity: 0,
                                    y: 24,
                                    scale: 0.96,
                                    filter: "blur(16px)",
                                }
                        }
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            filter: "blur(0px)",
                        }}
                        exit={
                            reduceMotion
                                ? {
                                    opacity: 0,
                                }
                                : {
                                    opacity: 0,
                                    y: 16,
                                    scale: 0.97,
                                    filter: "blur(12px)",
                                }
                        }
                        transition={{
                            duration: reduceMotion ? 0.15 : 0.5,
                            ease: SMOOTH_EASE,
                        }}
                        className="relative z-10 w-full max-w-[430px] overflow-hidden rounded-[28px] border border-black/[0.06] bg-white p-7 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] sm:p-9"
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-black/[0.05] text-black/55 transition duration-200 hover:bg-black/[0.09] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                        >
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            >
                                <path d="M6 6l12 12" />
                                <path d="M18 6L6 18" />
                            </svg>
                        </button>

                        <AnimatePresence mode="wait">
                            {status === "success" ? (
                                <motion.div
                                    key="success"
                                    initial={{
                                        opacity: 0,
                                        y: 12,
                                        filter: reduceMotion
                                            ? "blur(0px)"
                                            : "blur(10px)",
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        filter: "blur(0px)",
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -8,
                                    }}
                                    transition={{
                                        duration: reduceMotion
                                            ? 0.15
                                            : 0.4,
                                        ease: SMOOTH_EASE,
                                    }}
                                    className="pt-2"
                                >
                                    <div className="grid h-12 w-12 place-items-center rounded-full bg-[#edf7f6] text-[#317c78]">
                                        <svg
                                            aria-hidden="true"
                                            viewBox="0 0 24 24"
                                            className="h-6 w-6"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M5 12.5l4.2 4.2L19 7" />
                                        </svg>
                                    </div>

                                    <h2
                                        id="waitlist-heading"
                                        className="mt-6 font-display text-[28px] font-semibold leading-tight tracking-[-0.04em] text-[#171719]"
                                    >
                                        You&rsquo;re on the list.
                                    </h2>

                                    <p
                                        id="waitlist-description"
                                        className="mt-3 max-w-[340px] text-[15px] leading-6 text-black/55"
                                    >
                                        We&rsquo;ll email you when Elio
                                        beta access is ready.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="mt-7 h-13 w-full rounded-full bg-black px-6 text-[15px] font-semibold text-white transition duration-200 hover:bg-black/85 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2"
                                    >
                                        Done
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{
                                        opacity: 0,
                                        y: 12,
                                        filter: reduceMotion
                                            ? "blur(0px)"
                                            : "blur(10px)",
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        filter: "blur(0px)",
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -8,
                                        filter: reduceMotion
                                            ? "blur(0px)"
                                            : "blur(8px)",
                                    }}
                                    transition={{
                                        duration: reduceMotion
                                            ? 0.15
                                            : 0.42,
                                        ease: SMOOTH_EASE,
                                    }}
                                >
                                    <p className="pr-12 text-[13px] font-semibold text-[#317c78]">
                                        Elio beta
                                    </p>

                                    <h2
                                        id="waitlist-heading"
                                        className="mt-4 max-w-[330px] font-display text-[30px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#171719] sm:text-[34px]"
                                    >
                                        Join the waitlist.
                                    </h2>

                                    <p
                                        id="waitlist-description"
                                        className="mt-3 max-w-[350px] text-[15px] leading-6 text-black/55"
                                    >
                                        Enter your email to receive an
                                        invitation when beta testing
                                        opens.
                                    </p>

                                    <form
                                        onSubmit={handleSubmit}
                                        className="mt-7"
                                    >
                                        <label
                                            htmlFor="waitlist-email"
                                            className="sr-only"
                                        >
                                            Email address
                                        </label>

                                        <input
                                            ref={inputRef}
                                            id="waitlist-email"
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(event) => {
                                                setEmail(
                                                    event.target.value,
                                                );

                                                if (
                                                    status === "error"
                                                ) {
                                                    setStatus("idle");
                                                }
                                            }}
                                            placeholder="Email address"
                                            autoComplete="email"
                                            inputMode="email"
                                            required
                                            disabled={
                                                status === "submitting"
                                            }
                                            className={`h-14 w-full rounded-full border bg-white px-5 text-[15px] text-black outline-none transition duration-200 placeholder:text-black/35 focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 ${
                                                status === "error"
                                                    ? "border-red-400 focus:border-red-400 focus:ring-red-500/10"
                                                    : "border-black/10 focus:border-black/25 focus:ring-black/[0.04]"
                                            }`}
                                        />

                                        <button
                                            type="submit"
                                            disabled={
                                                status ===
                                                "submitting" ||
                                                !email.trim()
                                            }
                                            className="mt-3 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-black px-6 text-[15px] font-semibold text-white transition duration-200 hover:bg-black/85 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
                                        >
                                            {status ===
                                            "submitting" ? (
                                                <>
                                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                    Joining
                                                </>
                                            ) : (
                                                "Join waitlist"
                                            )}
                                        </button>

                                        <AnimatePresence>
                                            {status === "error" && (
                                                <motion.p
                                                    role="alert"
                                                    initial={{
                                                        opacity: 0,
                                                        y: -4,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        y: -4,
                                                    }}
                                                    transition={{
                                                        duration: 0.25,
                                                    }}
                                                    className="mt-3 text-center text-[13px] text-red-600"
                                                >
                                                    Something went wrong.
                                                    Please try again.
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </form>

                                    <p className="mt-5 text-center text-[12px] text-black/40">
                                        Beta invitations and important
                                        Elio updates only.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}