"use client";

import Image from "next/image";
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
} from "framer-motion";

type FeatureCard = {
    id: string;
    topic: string;
    headline: string;
    body: string;
    image: string;
    alt: string;
};

type ScrollEdges = {
    left: boolean;
    right: boolean;
};

const FEATURES: FeatureCard[] = [
    {
        id: "meet-elio",
        topic: "Meet Elio",
        headline: "Your health companion, ready when you are.",
        body: "See your medications, health profile, reminders, and important updates in one place.",
        image:
            "/assets/Simulator Screenshot - iPhone 17 - 2026-07-10 at 20.37.21.png",
        alt: "Elio home screen showing the health assistant and daily activity",
    },
    {
        id: "medications",
        topic: "Medications",
        headline: "Stay on top of every dose.",
        body: "Keep medication schedules, dosage details, and instructions organized throughout your day.",
        image:
            "/assets/Simulator Screenshot - iPhone 17 - 2026-07-10 at 22.24.36.png",
        alt: "Elio medications screen showing medication schedules and status",
    },
    {
        id: "vault",
        topic: "Health Vault",
        headline: "Keep your important records close.",
        body: "Store prescriptions, laboratory results, medical files, and personal health documents.",
        image:
            "/assets/Simulator Screenshot - iPhone 17 - 2026-07-10 at 22.24.19.png",
        alt: "Elio health vault screen showing saved health records",
    },
    {
        id: "insurance",
        topic: "Insurance",
        headline: "Understand your coverage at a glance.",
        body: "View insurance cards, deductible progress, remaining balances, and policy details.",
        image:
            "/assets/Simulator Screenshot - iPhone 17 - 2026-07-10 at 22.32.58.png",
        alt: "Elio insurance screen showing coverage and deductible information",
    },
    {
        id: "elio-ai",
        topic: "ElioAI",
        headline: "Ask Elio and get things done.",
        body: "Find health information, update records, and manage everyday tasks from your phone.",
        image:
            "/assets/Simulator Screenshot - iPhone 17 - 2026-07-10 at 22.36.44.png",
        alt: "ElioAI assistant completing health and insurance actions",
    },
];

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

function clamp(
    value: number,
    minimum: number,
    maximum: number,
) {
    return Math.min(Math.max(value, minimum), maximum);
}

function smootherStep(progress: number) {
    const value = clamp(progress, 0, 1);

    return (
        value *
        value *
        value *
        (value * (value * 6 - 15) + 10)
    );
}

function ChevronLeftIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m15 18-6-6 6-6" />
        </svg>
    );
}

function ChevronRightIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}

function PlusIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-[22px] w-[22px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        >
            <path d="M12 5v14M5 12h14" />
        </svg>
    );
}

export default function Hero() {
    const scrollerRef = useRef<HTMLUListElement>(null);

    const scrollAnimationFrameRef =
        useRef<number | null>(null);

    const scrollEffectsFrameRef =
        useRef<number | null>(null);

    const reduceMotion = useReducedMotion();

    const [scrollEdges, setScrollEdges] =
        useState<ScrollEdges>({
            left: false,
            right: true,
        });

    /*
     * The fade reaches full opacity after only 8 pixels.
     * This makes it appear almost immediately when dragging.
     */
    const leftFadeTarget = useMotionValue(0);
    const rightFadeTarget = useMotionValue(1);

    const leftFadeOpacity = useSpring(leftFadeTarget, {
        stiffness: 145,
        damping: 27,
        mass: 0.7,
        restDelta: 0.0001,
        restSpeed: 0.0001,
    });

    const rightFadeOpacity = useSpring(rightFadeTarget, {
        stiffness: 145,
        damping: 27,
        mass: 0.7,
        restDelta: 0.0001,
        restSpeed: 0.0001,
    });

    const cancelScrollAnimation = useCallback(() => {
        if (scrollAnimationFrameRef.current === null) {
            return;
        }

        cancelAnimationFrame(
            scrollAnimationFrameRef.current,
        );

        scrollAnimationFrameRef.current = null;
    }, []);

    const updateScrollEffects = useCallback(() => {
        const scroller = scrollerRef.current;

        if (!scroller) {
            return;
        }

        const maximumScroll = Math.max(
            scroller.scrollWidth - scroller.clientWidth,
            0,
        );

        const currentScroll = Math.max(
            scroller.scrollLeft,
            0,
        );

        const remainingScroll = Math.max(
            maximumScroll - currentScroll,
            0,
        );

        /*
         * Fade becomes visible after the first tiny movement.
         * It reaches full strength at 8 pixels.
         */
        const fadeActivationDistance = 8;

        const leftStrength = clamp(
            currentScroll / fadeActivationDistance,
            0,
            1,
        );

        const rightStrength = clamp(
            remainingScroll / fadeActivationDistance,
            0,
            1,
        );

        leftFadeTarget.set(leftStrength);
        rightFadeTarget.set(rightStrength);

        const nextLeft = currentScroll > 0.5;
        const nextRight = remainingScroll > 0.5;

        setScrollEdges((currentEdges) => {
            if (
                currentEdges.left === nextLeft &&
                currentEdges.right === nextRight
            ) {
                return currentEdges;
            }

            return {
                left: nextLeft,
                right: nextRight,
            };
        });
    }, [leftFadeTarget, rightFadeTarget]);

    const scheduleScrollEffectsUpdate =
        useCallback(() => {
            if (scrollEffectsFrameRef.current !== null) {
                return;
            }

            scrollEffectsFrameRef.current =
                requestAnimationFrame(() => {
                    scrollEffectsFrameRef.current = null;
                    updateScrollEffects();
                });
        }, [updateScrollEffects]);

    const animateScrollTo = useCallback(
        (targetPosition: number) => {
            const scroller = scrollerRef.current;

            if (!scroller) {
                return;
            }

            cancelScrollAnimation();

            const maximumScroll = Math.max(
                scroller.scrollWidth - scroller.clientWidth,
                0,
            );

            const target = clamp(
                targetPosition,
                0,
                maximumScroll,
            );

            const startPosition = scroller.scrollLeft;
            const distance = target - startPosition;

            if (
                reduceMotion ||
                Math.abs(distance) < 0.5
            ) {
                scroller.scrollLeft = target;
                updateScrollEffects();
                return;
            }

            /*
             * A longer duration with smootherStep gives the cards
             * a soft Apple-style acceleration and deceleration.
             */
            const duration = clamp(
                780 + Math.abs(distance) * 0.32,
                880,
                1180,
            );

            const startTime = performance.now();

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;

                const progress = clamp(
                    elapsed / duration,
                    0,
                    1,
                );

                const easedProgress =
                    smootherStep(progress);

                scroller.scrollLeft =
                    startPosition +
                    distance * easedProgress;

                updateScrollEffects();

                if (progress < 1) {
                    scrollAnimationFrameRef.current =
                        requestAnimationFrame(animate);

                    return;
                }

                scroller.scrollLeft = target;
                scrollAnimationFrameRef.current = null;

                updateScrollEffects();
            };

            scrollAnimationFrameRef.current =
                requestAnimationFrame(animate);
        },
        [
            cancelScrollAnimation,
            reduceMotion,
            updateScrollEffects,
        ],
    );

    const scrollByCard = useCallback(
        (direction: 1 | -1) => {
            const scroller = scrollerRef.current;

            if (!scroller) {
                return;
            }

            const cards = Array.from(
                scroller.querySelectorAll<HTMLElement>(
                    "[data-feature-card]",
                ),
            );

            if (cards.length === 0) {
                return;
            }

            const currentPosition = scroller.scrollLeft;

            let closestIndex = 0;
            let closestDistance = Number.POSITIVE_INFINITY;

            cards.forEach((card, index) => {
                const distance = Math.abs(
                    card.offsetLeft - currentPosition,
                );

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            const targetIndex = clamp(
                closestIndex + direction,
                0,
                cards.length - 1,
            );

            animateScrollTo(
                cards[targetIndex].offsetLeft,
            );
        },
        [animateScrollTo],
    );

    useEffect(() => {
        const scroller = scrollerRef.current;

        if (!scroller) {
            return;
        }

        const handleManualInteraction = () => {
            cancelScrollAnimation();
        };

        const resizeObserver = new ResizeObserver(() => {
            scheduleScrollEffectsUpdate();
        });

        scroller.addEventListener(
            "scroll",
            scheduleScrollEffectsUpdate,
            {
                passive: true,
            },
        );

        scroller.addEventListener(
            "wheel",
            handleManualInteraction,
            {
                passive: true,
            },
        );

        scroller.addEventListener(
            "touchstart",
            handleManualInteraction,
            {
                passive: true,
            },
        );

        scroller.addEventListener(
            "pointerdown",
            handleManualInteraction,
            {
                passive: true,
            },
        );

        window.addEventListener(
            "resize",
            scheduleScrollEffectsUpdate,
        );

        resizeObserver.observe(scroller);

        const initialUpdateFrame =
            requestAnimationFrame(() => {
                updateScrollEffects();
            });

        return () => {
            cancelAnimationFrame(initialUpdateFrame);
            cancelScrollAnimation();

            if (scrollEffectsFrameRef.current !== null) {
                cancelAnimationFrame(
                    scrollEffectsFrameRef.current,
                );
            }

            scroller.removeEventListener(
                "scroll",
                scheduleScrollEffectsUpdate,
            );

            scroller.removeEventListener(
                "wheel",
                handleManualInteraction,
            );

            scroller.removeEventListener(
                "touchstart",
                handleManualInteraction,
            );

            scroller.removeEventListener(
                "pointerdown",
                handleManualInteraction,
            );

            window.removeEventListener(
                "resize",
                scheduleScrollEffectsUpdate,
            );

            resizeObserver.disconnect();
        };
    }, [
        cancelScrollAnimation,
        scheduleScrollEffectsUpdate,
        updateScrollEffects,
    ]);

    return (
        <motion.section
            id="home"
            aria-labelledby="elio-features-heading"
            initial={
                reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        filter: "blur(20px)",
                    }
            }
            whileInView={{
                opacity: 1,
                filter: "blur(0px)",
            }}
            viewport={{
                once: true,
                amount: 0.08,
            }}
            transition={{
                opacity: {
                    duration: 0.8,
                    ease: ENTRANCE_EASE,
                },
                filter: {
                    duration: 1.15,
                    ease: ENTRANCE_EASE,
                },
            }}
            className="
        relative overflow-hidden
        bg-[#f5f5f7]
        py-14
        sm:py-[72px]
        lg:py-24
      "
        >
            <motion.div
                aria-hidden="true"
                initial={
                    reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            scale: 0.82,
                            filter: "blur(60px)",
                        }
                }
                whileInView={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(40px)",
                }}
                viewport={{
                    once: true,
                    amount: 0.08,
                }}
                transition={{
                    duration: 1.35,
                    ease: ENTRANCE_EASE,
                }}
                className="
          pointer-events-none
          absolute left-1/2 top-0
          h-[360px] w-[70vw]
          max-w-[1000px]
          -translate-x-1/2
          rounded-full
          bg-white/70
        "
            />

            <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
                <div className="mb-10 flex items-end justify-between gap-8 sm:mb-12 lg:mb-14">
                    <motion.div
                        initial={
                            reduceMotion
                                ? false
                                : {
                                    opacity: 0,
                                    y: 28,
                                    scale: 0.975,
                                    filter: "blur(16px)",
                                }
                        }
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            filter: "blur(0px)",
                        }}
                        viewport={{
                            once: true,
                            amount: 0.4,
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.08,
                            ease: ENTRANCE_EASE,
                        }}
                        className="
              flex min-w-0 items-start
              gap-4
              sm:gap-5
              lg:gap-6
            "
                    >
                        <Image
                            src="/elio-land.svg"
                            alt="Elio"
                            width={220}
                            height={58}
                            priority
                            draggable={false}
                            className="
                mt-[1px]
                h-[38px] w-auto shrink-0
                select-none object-contain
                sm:h-[48px]
                lg:h-[58px]
              "
                        />

                        <h1
                            id="elio-features-heading"
                            className="
                max-w-[760px] min-w-0
                font-display
                text-[38px] font-semibold
                leading-[1.04]
                tracking-[-0.045em]
                text-[#1d1d1f]
                sm:text-[48px]
                lg:text-[58px]
              "
                        >
                            Why Elio makes managing your health easier.
                        </h1>
                    </motion.div>

                    <motion.a
                        href="#about"
                        initial={
                            reduceMotion
                                ? false
                                : {
                                    opacity: 0,
                                    x: 18,
                                    filter: "blur(10px)",
                                }
                        }
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            filter: "blur(0px)",
                        }}
                        viewport={{
                            once: true,
                            amount: 0.4,
                        }}
                        transition={{
                            duration: 0.9,
                            delay: 0.25,
                            ease: ENTRANCE_EASE,
                        }}
                        className="
              hidden shrink-0 items-center
              gap-1 pb-2
              text-[17px] font-medium
              text-[#0066cc]
              transition-colors duration-300
              hover:text-[#004f9e]
              sm:inline-flex
            "
                    >
                        Explore Elio

                        <span
                            aria-hidden="true"
                            className="text-[24px] leading-none"
                        >
              ›
            </span>
                    </motion.a>
                </div>

                <motion.div
                    initial={
                        reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 34,
                                filter: "blur(18px)",
                            }
                    }
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                    }}
                    viewport={{
                        once: true,
                        amount: 0.08,
                    }}
                    transition={{
                        duration: 1.05,
                        delay: 0.16,
                        ease: ENTRANCE_EASE,
                    }}
                >
                    <div className="relative">
                        <ul
                            ref={scrollerRef}
                            className="
                flex snap-x snap-proximity
                gap-5
                overflow-x-auto
                overscroll-x-contain
                pb-3
                pr-[16vw]
                sm:gap-6
                sm:pr-[14vw]
                lg:pr-[12vw]
                [-ms-overflow-style:none]
                [scroll-behavior:auto]
                [scrollbar-width:none]
                [touch-action:pan-x]
                [&::-webkit-scrollbar]:hidden
              "
                        >
                            {FEATURES.map((feature, index) => (
                                <motion.li
                                    key={feature.id}
                                    data-feature-card
                                    initial={
                                        reduceMotion
                                            ? false
                                            : {
                                                opacity: 0,
                                                y: 44,
                                                scale: 0.955,
                                                filter: "blur(18px)",
                                            }
                                    }
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        filter: "blur(0px)",
                                    }}
                                    viewport={{
                                        once: true,
                                        amount: 0.08,
                                        margin: "0px 100px 0px 100px",
                                    }}
                                    transition={{
                                        duration: 0.95,
                                        delay: reduceMotion
                                            ? 0
                                            : 0.22 + index * 0.075,
                                        ease: ENTRANCE_EASE,
                                    }}
                                    className="
                    h-[600px]
                    w-[86vw]
                    max-w-[420px]
                    shrink-0
                    snap-start
                    sm:h-[630px]
                    sm:w-[400px]
                    lg:h-[660px]
                    lg:w-[420px]
                  "
                                >
                                    <article
                                        className="
                      group relative grid h-full
                      grid-rows-[296px_304px]
                      overflow-hidden
                      rounded-[30px]
                      bg-white
                      shadow-[0_1px_2px_rgba(0,0,0,0.02)]
                      transition-transform
                      duration-700
                      ease-[cubic-bezier(0.16,1,0.3,1)]
                      hover:-translate-y-1
                      sm:grid-rows-[304px_326px]
                      lg:grid-rows-[312px_348px]
                    "
                                    >
                                        <div className="relative z-10 px-7 pt-8 sm:px-8 sm:pt-9">
                                            <p className="text-[15px] font-semibold leading-none text-[#1d1d1f]">
                                                {feature.topic}
                                            </p>

                                            <h2
                                                className="
                          mt-5 max-w-[345px]
                          font-display
                          text-[28px] font-semibold
                          leading-[1.06]
                          tracking-[-0.04em]
                          text-[#1d1d1f]
                          sm:text-[30px]
                          lg:text-[31px]
                        "
                                            >
                                                {feature.headline}
                                            </h2>

                                            <p
                                                className="
                          mt-4 max-w-[345px]
                          text-[16px]
                          leading-[1.45]
                          text-[#424245]
                          sm:text-[17px]
                        "
                                            >
                                                {feature.body}
                                            </p>
                                        </div>

                                        <div className="relative overflow-hidden">
                                            <div
                                                className="
                          absolute left-1/2 top-0
                          aspect-[941/2048]
                          w-[280px]
                          -translate-x-1/2
                          overflow-hidden
                          rounded-[48px]
                          bg-[#dff3ff]
                          shadow-[0_18px_45px_-24px_rgba(0,0,0,0.45)]
                          ring-1 ring-black/10
                          transition-transform
                          duration-[900ms]
                          ease-[cubic-bezier(0.16,1,0.3,1)]
                          group-hover:scale-[1.018]
                          sm:w-[300px]
                          sm:rounded-[52px]
                          lg:w-[320px]
                          lg:rounded-[56px]
                        "
                                            >
                                                <Image
                                                    src={encodeURI(feature.image)}
                                                    alt={feature.alt}
                                                    fill
                                                    priority
                                                    unoptimized
                                                    quality={100}
                                                    draggable={false}
                                                    sizes="
                            (max-width: 639px) 280px,
                            (max-width: 1023px) 300px,
                            320px
                          "
                                                    className="
                            select-none
                            object-cover
                            object-top
                            transition-transform
                            duration-[1100ms]
                            ease-[cubic-bezier(0.16,1,0.3,1)]
                            group-hover:scale-[1.008]
                          "
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            aria-label={`Learn more about ${feature.topic}`}
                                            className="
                        absolute bottom-5 right-5 z-20
                        grid h-11 w-11
                        place-items-center
                        rounded-full
                        bg-[#e8e8ed]/95
                        text-[#6e6e73]
                        backdrop-blur-md
                        transition-all
                        duration-300
                        ease-[cubic-bezier(0.16,1,0.3,1)]
                        hover:scale-105
                        hover:bg-[#1d1d1f]
                        hover:text-white
                        active:scale-95
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#0071e3]
                        focus-visible:ring-offset-2
                      "
                                        >
                                            <PlusIcon />
                                        </button>
                                    </article>
                                </motion.li>
                            ))}
                        </ul>

                        <motion.div
                            aria-hidden="true"
                            style={{
                                opacity: leftFadeOpacity,
                            }}
                            className="
                pointer-events-none
                absolute inset-y-0 left-0 z-30
                w-[100px]
                overflow-hidden
                sm:w-[160px]
                lg:w-[230px]
              "
                        >
                            <div
                                className="
                  absolute inset-0
                  bg-[linear-gradient(90deg,#f5f5f7_0%,rgba(245,245,247,0.99)_16%,rgba(245,245,247,0.94)_32%,rgba(245,245,247,0.78)_50%,rgba(245,245,247,0.48)_68%,rgba(245,245,247,0.18)_84%,transparent_100%)]
                  backdrop-blur-[14px]
                  [-webkit-mask-image:linear-gradient(to_right,black_0%,black_56%,transparent_100%)]
                  [mask-image:linear-gradient(to_right,black_0%,black_56%,transparent_100%)]
                "
                            />

                            <div
                                className="
                  absolute inset-y-0 left-0
                  w-[72%]
                  bg-gradient-to-r
                  from-[#f5f5f7]
                  via-[#f5f5f7]/80
                  to-transparent
                  backdrop-blur-[26px]
                  [-webkit-mask-image:linear-gradient(to_right,black_0%,transparent_100%)]
                  [mask-image:linear-gradient(to_right,black_0%,transparent_100%)]
                "
                            />

                            <div
                                className="
                  absolute inset-y-0 left-0
                  w-[40%]
                  bg-[#f5f5f7]/90
                  backdrop-blur-[38px]
                  [-webkit-mask-image:linear-gradient(to_right,black_0%,transparent_100%)]
                  [mask-image:linear-gradient(to_right,black_0%,transparent_100%)]
                "
                            />
                        </motion.div>

                        <motion.div
                            aria-hidden="true"
                            style={{
                                opacity: rightFadeOpacity,
                            }}
                            className="
                pointer-events-none
                absolute inset-y-0 right-0 z-30
                w-[100px]
                overflow-hidden
                sm:w-[160px]
                lg:w-[230px]
              "
                        >
                            <div
                                className="
                  absolute inset-0
                  bg-[linear-gradient(270deg,#f5f5f7_0%,rgba(245,245,247,0.99)_16%,rgba(245,245,247,0.94)_32%,rgba(245,245,247,0.78)_50%,rgba(245,245,247,0.48)_68%,rgba(245,245,247,0.18)_84%,transparent_100%)]
                  backdrop-blur-[14px]
                  [-webkit-mask-image:linear-gradient(to_left,black_0%,black_56%,transparent_100%)]
                  [mask-image:linear-gradient(to_left,black_0%,black_56%,transparent_100%)]
                "
                            />

                            <div
                                className="
                  absolute inset-y-0 right-0
                  w-[72%]
                  bg-gradient-to-l
                  from-[#f5f5f7]
                  via-[#f5f5f7]/80
                  to-transparent
                  backdrop-blur-[26px]
                  [-webkit-mask-image:linear-gradient(to_left,black_0%,transparent_100%)]
                  [mask-image:linear-gradient(to_left,black_0%,transparent_100%)]
                "
                            />

                            <div
                                className="
                  absolute inset-y-0 right-0
                  w-[40%]
                  bg-[#f5f5f7]/90
                  backdrop-blur-[38px]
                  [-webkit-mask-image:linear-gradient(to_left,black_0%,transparent_100%)]
                  [mask-image:linear-gradient(to_left,black_0%,transparent_100%)]
                "
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={
                            reduceMotion
                                ? false
                                : {
                                    opacity: 0,
                                    y: 16,
                                    filter: "blur(10px)",
                                }
                        }
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                        }}
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                        transition={{
                            duration: 0.85,
                            delay: 0.48,
                            ease: ENTRANCE_EASE,
                        }}
                        className="mt-6 flex items-center justify-between sm:justify-end"
                    >
                        <a
                            href="#about"
                            className="
                inline-flex items-center
                gap-1
                text-[16px] font-medium
                text-[#0066cc]
                transition-colors duration-300
                hover:text-[#004f9e]
                sm:hidden
              "
                        >
                            Explore Elio

                            <span
                                aria-hidden="true"
                                className="text-[23px] leading-none"
                            >
                ›
              </span>
                        </a>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                aria-label="Previous Elio feature"
                                onClick={() => scrollByCard(-1)}
                                disabled={!scrollEdges.left}
                                className="
                  grid h-11 w-11
                  place-items-center
                  rounded-full
                  bg-[#e8e8ed]
                  text-[#6e6e73]
                  transition-all
                  duration-300
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  hover:scale-105
                  hover:bg-[#d2d2d7]
                  hover:text-[#1d1d1f]
                  active:scale-95
                  disabled:cursor-default
                  disabled:opacity-35
                  disabled:hover:scale-100
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#0071e3]
                "
                            >
                                <ChevronLeftIcon />
                            </button>

                            <button
                                type="button"
                                aria-label="Next Elio feature"
                                onClick={() => scrollByCard(1)}
                                disabled={!scrollEdges.right}
                                className="
                  grid h-11 w-11
                  place-items-center
                  rounded-full
                  bg-[#e8e8ed]
                  text-[#6e6e73]
                  transition-all
                  duration-300
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  hover:scale-105
                  hover:bg-[#d2d2d7]
                  hover:text-[#1d1d1f]
                  active:scale-95
                  disabled:cursor-default
                  disabled:opacity-35
                  disabled:hover:scale-100
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#0071e3]
                "
                            >
                                <ChevronRightIcon />
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}