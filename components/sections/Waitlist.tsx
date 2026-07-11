"use client";

import {
    FormEvent,
    KeyboardEvent as ReactKeyboardEvent,
    useEffect,
    useRef,
    useState,
} from "react";
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

const FADE_EASE: [number, number, number, number] = [
    0.22, 0.8, 0.24, 1,
];

const focusableElementsSelector = [
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "a[href]",
    '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function WaitlistModal({
                                          open,
                                          onClose,
                                      }: WaitlistModalProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<FormStatus>("idle");

    const dialogRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const previousFocusedElement = useRef<HTMLElement | null>(null);

    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (!open) return;

        previousFocusedElement.current =
            document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null;

        setEmail("");
        setStatus("idle");

        const focusTimer = window.setTimeout(
            () => inputRef.current?.focus(),
            reduceMotion ? 50 : 480,
        );

        return () => {
            window.clearTimeout(focusTimer);
            previousFocusedElement.current?.focus();
        };
    }, [open, reduceMotion]);

    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        const previousPaddingRight = document.body.style.paddingRight;

        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = "hidden";

        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        return () => {
            document.body.style.overflow = previousOverflow;
            document.body.style.paddingRight = previousPaddingRight;
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
                return;
            }

            if (event.key !== "Tab") return;

            const dialog = dialogRef.current;
            if (!dialog) return;

            const focusableElements = Array.from(
                dialog.querySelectorAll<HTMLElement>(
                    focusableElementsSelector,
                ),
            );

            if (focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement =
                focusableElements[focusableElements.length - 1];

            if (
                event.shiftKey &&
                document.activeElement === firstElement
            ) {
                event.preventDefault();
                lastElement.focus();
                return;
            }

            if (
                !event.shiftKey &&
                document.activeElement === lastElement
            ) {
                event.preventDefault();
                firstElement.focus();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

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
                throw new Error("Waitlist submission failed");
            }

            setEmail("");
            setStatus("success");
        } catch {
            setStatus("error");

            window.setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }

    function handleDialogKeyDown(
        event: ReactKeyboardEvent<HTMLDivElement>,
    ) {
        if (event.key === "Escape") {
            event.stopPropagation();
        }
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto px-4 py-6 sm:px-6 sm:py-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: reduceMotion ? 0.15 : 0.35,
                        ease: FADE_EASE,
                    }}
                >
                    <motion.div
                        aria-hidden="true"
                        onClick={onClose}
                        className="absolute inset-0 cursor-default bg-[#06131b]/40"
                        initial={{
                            opacity: 0,
                            backdropFilter: "blur(0px)",
                            WebkitBackdropFilter: "blur(0px)",
                        }}
                        animate={{
                            opacity: 1,
                            backdropFilter: reduceMotion
                                ? "blur(10px)"
                                : "blur(16px)",
                            WebkitBackdropFilter: reduceMotion
                                ? "blur(10px)"
                                : "blur(16px)",
                        }}
                        exit={{
                            opacity: 0,
                            backdropFilter: "blur(0px)",
                            WebkitBackdropFilter: "blur(0px)",
                        }}
                        transition={{
                            duration: reduceMotion ? 0.15 : 0.55,
                            ease: SMOOTH_EASE,
                        }}
                    />

                    <motion.div
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="waitlist-modal-heading"
                        aria-describedby="waitlist-modal-description"
                        onKeyDown={handleDialogKeyDown}
                        initial={
                            reduceMotion
                                ? { opacity: 0 }
                                : {
                                    opacity: 0,
                                    y: 38,
                                    scale: 0.94,
                                }
                        }
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={
                            reduceMotion
                                ? { opacity: 0 }
                                : {
                                    opacity: 0,
                                    y: 24,
                                    scale: 0.96,
                                }
                        }
                        transition={{
                            opacity: {
                                duration: reduceMotion ? 0.15 : 0.34,
                                ease: FADE_EASE,
                            },
                            y: reduceMotion
                                ? { duration: 0 }
                                : {
                                    type: "spring",
                                    stiffness: 190,
                                    damping: 24,
                                    mass: 0.9,
                                },
                            scale: reduceMotion
                                ? { duration: 0 }
                                : {
                                    type: "spring",
                                    stiffness: 190,
                                    damping: 24,
                                    mass: 0.9,
                                },
                        }}
                        className="relative z-10 w-full max-w-[500px] overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_35px_100px_-35px_rgba(0,25,45,0.65)] sm:rounded-[38px]"
                    >
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 overflow-hidden"
                        >
                            <div className="absolute -right-24 -top-32 h-72 w-72 rounded-full bg-[#d7f4f5] opacity-80 blur-[60px]" />
                            <div className="absolute -left-32 top-20 h-64 w-64 rounded-full bg-[#e6f2ff] opacity-70 blur-[70px]" />
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close waitlist"
                            className="absolute right-5 top-5 z-20 grid h-11 w-11 place-items-center rounded-full border border-black/[0.06] bg-white/75 text-[#61676b] shadow-sm backdrop-blur-xl transition duration-300 hover:scale-[1.04] hover:bg-white hover:text-black active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#287c8c] focus-visible:ring-offset-2 sm:right-6 sm:top-6"
                        >
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="h-[18px] w-[18px]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.1"
                                strokeLinecap="round"
                            >
                                <path d="M6 6l12 12" />
                                <path d="M18 6L6 18" />
                            </svg>
                        </button>

                        <div className="relative p-6 pt-8 sm:p-10 sm:pt-10">
                            <AnimatePresence mode="wait">
                                {status === "success" ? (
                                    <motion.div
                                        key="success"
                                        initial={
                                            reduceMotion
                                                ? { opacity: 0 }
                                                : {
                                                    opacity: 0,
                                                    y: 18,
                                                    filter:
                                                        "blur(14px)",
                                                }
                                        }
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            filter: "blur(0px)",
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -10,
                                            filter: reduceMotion
                                                ? "blur(0px)"
                                                : "blur(8px)",
                                        }}
                                        transition={{
                                            duration: reduceMotion
                                                ? 0.15
                                                : 0.48,
                                            ease: SMOOTH_EASE,
                                        }}
                                    >
                                        <div className="grid h-14 w-14 place-items-center rounded-[20px] bg-[#e5f6f3] text-[#247c70] shadow-[inset_0_0_0_1px_rgba(36,124,112,0.08)]">
                                            <motion.svg
                                                aria-hidden="true"
                                                viewBox="0 0 24 24"
                                                className="h-7 w-7"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                initial={
                                                    reduceMotion
                                                        ? undefined
                                                        : {
                                                            pathLength:
                                                                0,
                                                            opacity: 0,
                                                        }
                                                }
                                                animate={{
                                                    pathLength: 1,
                                                    opacity: 1,
                                                }}
                                                transition={{
                                                    duration:
                                                        reduceMotion
                                                            ? 0
                                                            : 0.5,
                                                    delay:
                                                        reduceMotion
                                                            ? 0
                                                            : 0.18,
                                                }}
                                            >
                                                <motion.path d="M5 12.5l4.2 4.2L19 7" />
                                            </motion.svg>
                                        </div>

                                        <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#287c8c]">
                                            Registration complete
                                        </p>

                                        <h2
                                            id="waitlist-modal-heading"
                                            className="mt-3 max-w-[390px] font-display text-[30px] font-semibold leading-[1.06] tracking-[-0.045em] text-[#151719] sm:text-[38px]"
                                        >
                                            You&rsquo;re on the list.
                                        </h2>

                                        <p
                                            id="waitlist-modal-description"
                                            className="mt-4 max-w-[390px] text-[15px] leading-7 text-[#62696d] sm:text-[16px]"
                                        >
                                            We&rsquo;ll email you when
                                            Elio beta access is ready.
                                            Watch your inbox for your
                                            invitation.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="mt-8 flex min-h-14 w-full items-center justify-center rounded-full bg-[#111719] px-7 text-[15px] font-semibold text-white shadow-[0_12px_26px_-14px_rgba(0,0,0,0.7)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#263033] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#287c8c] focus-visible:ring-offset-2"
                                        >
                                            Done
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="form"
                                        initial={
                                            reduceMotion
                                                ? { opacity: 0 }
                                                : {
                                                    opacity: 0,
                                                    y: 20,
                                                    filter:
                                                        "blur(18px)",
                                                }
                                        }
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            filter: "blur(0px)",
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -12,
                                            filter: reduceMotion
                                                ? "blur(0px)"
                                                : "blur(10px)",
                                        }}
                                        transition={{
                                            duration: reduceMotion
                                                ? 0.15
                                                : 0.58,
                                            delay: reduceMotion
                                                ? 0
                                                : 0.06,
                                            ease: SMOOTH_EASE,
                                        }}
                                    >
                                        <div className="inline-flex items-center gap-2 rounded-full border border-[#287c8c]/10 bg-[#eaf7f7]/80 px-3.5 py-2 text-[12px] font-semibold text-[#287c8c] backdrop-blur-xl">
                                            <span className="relative flex h-2 w-2">
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#287c8c] opacity-30" />
                                                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#287c8c]" />
                                            </span>

                                            Early beta access
                                        </div>

                                        <h2
                                            id="waitlist-modal-heading"
                                            className="mt-6 max-w-[410px] font-display text-[32px] font-semibold leading-[1.04] tracking-[-0.05em] text-[#151719] sm:text-[42px]"
                                        >
                                            Be one of the first to try
                                            Elio.
                                        </h2>

                                        <p
                                            id="waitlist-modal-description"
                                            className="mt-4 max-w-[410px] text-[15px] leading-7 text-[#62696d] sm:text-[16px]"
                                        >
                                            Enter your email to receive
                                            an invitation when Elio beta
                                            testing opens.
                                        </p>

                                        <form
                                            onSubmit={handleSubmit}
                                            className="mt-8"
                                            noValidate={false}
                                        >
                                            <label
                                                htmlFor="waitlist-modal-email"
                                                className="mb-2.5 block pl-1 text-[13px] font-semibold text-[#383e41]"
                                            >
                                                Email address
                                            </label>

                                            <div
                                                className={`flex min-h-[60px] items-center rounded-full border bg-white/90 p-1.5 shadow-[0_10px_30px_-22px_rgba(0,31,48,0.8)] backdrop-blur-xl transition duration-300 focus-within:border-[#287c8c]/60 focus-within:ring-4 focus-within:ring-[#287c8c]/10 ${
                                                    status === "error"
                                                        ? "border-red-400/80"
                                                        : "border-black/[0.09]"
                                                }`}
                                            >
                                                <div className="ml-3 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f2f6f6] text-[#596366]">
                                                    <svg
                                                        aria-hidden="true"
                                                        viewBox="0 0 24 24"
                                                        className="h-[18px] w-[18px]"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.9"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <rect
                                                            x="3"
                                                            y="5"
                                                            width="18"
                                                            height="14"
                                                            rx="3"
                                                        />
                                                        <path d="M4.5 7l7.5 6 7.5-6" />
                                                    </svg>
                                                </div>

                                                <input
                                                    ref={inputRef}
                                                    id="waitlist-modal-email"
                                                    type="email"
                                                    name="email"
                                                    value={email}
                                                    onChange={(event) => {
                                                        setEmail(
                                                            event.target
                                                                .value,
                                                        );

                                                        if (
                                                            status ===
                                                            "error"
                                                        ) {
                                                            setStatus(
                                                                "idle",
                                                            );
                                                        }
                                                    }}
                                                    placeholder="you@example.com"
                                                    autoComplete="email"
                                                    inputMode="email"
                                                    required
                                                    disabled={
                                                        status ===
                                                        "submitting"
                                                    }
                                                    aria-invalid={
                                                        status ===
                                                        "error"
                                                    }
                                                    aria-describedby={
                                                        status ===
                                                        "error"
                                                            ? "waitlist-error"
                                                            : undefined
                                                    }
                                                    className="h-12 min-w-0 flex-1 bg-transparent px-3 text-[15px] text-[#151719] outline-none placeholder:text-[#9aa0a3] disabled:cursor-not-allowed disabled:opacity-60 sm:text-[16px]"
                                                />

                                                <button
                                                    type="submit"
                                                    disabled={
                                                        status ===
                                                        "submitting" ||
                                                        !email.trim()
                                                    }
                                                    className="hidden h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#111719] px-6 text-[14px] font-semibold text-white shadow-[0_10px_22px_-13px_rgba(0,0,0,0.85)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#263033] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-45 sm:flex"
                                                >
                                                    {status ===
                                                    "submitting" ? (
                                                        <>
                                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                            Joining
                                                        </>
                                                    ) : (
                                                        <>
                                                            Join waitlist

                                                            <svg
                                                                aria-hidden="true"
                                                                viewBox="0 0 24 24"
                                                                className="h-4 w-4"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <path d="M5 12h14" />
                                                                <path d="M13 6l6 6-6 6" />
                                                            </svg>
                                                        </>
                                                    )}
                                                </button>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={
                                                    status ===
                                                    "submitting" ||
                                                    !email.trim()
                                                }
                                                className="mt-3 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#111719] px-7 text-[15px] font-semibold text-white shadow-[0_12px_26px_-14px_rgba(0,0,0,0.7)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#263033] active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-45 sm:hidden"
                                            >
                                                {status ===
                                                "submitting" ? (
                                                    <>
                                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                        Joining waitlist
                                                    </>
                                                ) : (
                                                    "Join waitlist"
                                                )}
                                            </button>

                                            <AnimatePresence>
                                                {status === "error" && (
                                                    <motion.p
                                                        id="waitlist-error"
                                                        role="alert"
                                                        aria-live="polite"
                                                        initial={{
                                                            opacity: 0,
                                                            y: -6,
                                                            filter:
                                                                "blur(5px)",
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                            filter:
                                                                "blur(0px)",
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            y: -4,
                                                        }}
                                                        transition={{
                                                            duration: 0.3,
                                                            ease: FADE_EASE,
                                                        }}
                                                        className="mt-3 pl-1 text-[13px] leading-5 text-red-600"
                                                    >
                                                        We couldn&rsquo;t
                                                        add your email.
                                                        Check your
                                                        connection and try
                                                        again.
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </form>

                                        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-black/[0.06] pt-5 text-[12px] font-medium text-[#777e81]">
                                            <span className="inline-flex items-center gap-1.5">
                                                <svg
                                                    aria-hidden="true"
                                                    viewBox="0 0 24 24"
                                                    className="h-4 w-4 text-[#287c8c]"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M12 3l7 3v5c0 4.6-2.9 8.1-7 10-4.1-1.9-7-5.4-7-10V6l7-3z" />
                                                    <path d="M9.5 12l1.7 1.7 3.6-3.7" />
                                                </svg>

                                                No spam
                                            </span>

                                            <span className="inline-flex items-center gap-1.5">
                                                <svg
                                                    aria-hidden="true"
                                                    viewBox="0 0 24 24"
                                                    className="h-4 w-4 text-[#287c8c]"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <rect
                                                        x="5"
                                                        y="10"
                                                        width="14"
                                                        height="10"
                                                        rx="2"
                                                    />
                                                    <path d="M8 10V7a4 4 0 018 0v3" />
                                                </svg>

                                                Your email stays private
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}