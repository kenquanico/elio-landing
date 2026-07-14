"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
    type Variants,
} from "framer-motion";
import {
    CalendarClock,
    ChevronLeft,
    ChevronRight,
    CircleHelp,
    FileHeart,
    FileText,
    FolderLock,
    MessageCircleHeart,
    Pill,
    Plus,
    ShieldCheck,
    Sparkles,
    WifiOff,
    type LucideIcon,
} from "lucide-react";
import WaitlistModal from "./Waitlist";

type HeroView = "features" | "explore" | "detail";

type FeatureCard = {
    id: string;
    topic: string;
    headline: string;
    body: string;
    image: string;
    alt: string;
    exploreId: string;
    detailBody: [string, string];
};

type ExploreTone = "light" | "navy";

type ExploreKind =
    | "assistant"
    | "insurance"
    | "medications"
    | "offline"
    | "vault"
    | "actions"
    | "daily"
    | "faq";

type ExploreCard = {
    id: string;
    title: string;
    summary: string;
    kind: ExploreKind;
    tone: ExploreTone;
    layout: string;
};

type FeatureCarouselProps = {
    onExplore: (itemId: string) => void;
};

type ExploreGridProps = {
    focusedItemId: string | null;
};

type FeatureDetailProps = {
    feature: FeatureCard;
    reduceMotion: boolean;
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
        exploreId: "assistant",
        detailBody: [
            "Your home view organizes upcoming doses, recent health records, insurance information, reminders, and important updates by priority. Instead of checking several apps or searching through folders, you can quickly understand what needs attention now and what is coming next.",
            "Elio is designed to make everyday health management feel easier to follow. Clear labels, timely status updates, and connected information help you prepare for appointments, keep routines consistent, and find essential details when you or someone supporting your care needs them.",
        ],
    },
    {
        id: "medications",
        topic: "Medications",
        headline: "Stay on top of every dose.",
        body: "Keep medication schedules, dosage details, and instructions organized throughout your day.",
        image:
            "/assets/Simulator Screenshot - iPhone 17 - 2026-07-10 at 22.24.36.png",
        alt: "Elio medications screen showing medication schedules and status",
        exploreId: "medications",
        detailBody: [
            "Each medication can include its name, dosage, schedule, purpose, and instructions, giving you a complete reference whenever you need it. Daily status indicators make it easy to distinguish upcoming, due, and completed doses without reading through a complicated list.",
            "By keeping the full routine in one place, Elio helps reduce uncertainty around what to take and when to take it. You can review the day ahead, confirm completed doses, and carry accurate medication details into a consultation or conversation with a caregiver.",
        ],
    },
    {
        id: "vault",
        topic: "Health Vault",
        headline: "Keep your important records close.",
        body: "Store prescriptions, laboratory results, medical files, and personal health documents.",
        image:
            "/assets/Simulator Screenshot - iPhone 17 - 2026-07-10 at 22.24.19.png",
        alt: "Elio health vault screen showing saved health records",
        exploreId: "vault",
        detailBody: [
            "The Health Vault keeps prescriptions, laboratory results, medical certificates, imaging reports, and other personal records together. Files are organized by type and date, so you can identify the correct document without opening every file or searching across different devices.",
            "Having a dependable record library makes appointments, emergencies, follow-up care, and insurance requests easier to handle. You can quickly locate the information being requested and keep a clearer history of documents that may be useful for future decisions.",
        ],
    },
    {
        id: "insurance",
        topic: "Insurance",
        headline: "Understand your coverage at a glance.",
        body: "View insurance cards, deductible progress, remaining balances, and policy details.",
        image:
            "/assets/Simulator Screenshot - iPhone 17 - 2026-07-10 at 22.32.58.png",
        alt: "Elio insurance screen showing coverage and deductible information",
        exploreId: "insurance",
        detailBody: [
            "Keep PhilHealth, private health coverage, and life insurance information in one organized view. Elio presents digital cards, member and policy details, deductible progress, covered amounts, and remaining balances in a format that is quick to scan and easier to understand.",
            "When arranging care or reviewing a claim, you can refer to the details that matter without searching through emails, paper cards, or separate provider portals. This gives you a clearer picture of your available coverage before making health-related decisions.",
        ],
    },
    {
        id: "elio-ai",
        topic: "ElioAI",
        headline: "Ask Elio and get things done.",
        body: "Find health information, update records, and manage everyday tasks from your phone.",
        image:
            "/assets/Simulator Screenshot - iPhone 17 - 2026-07-10 at 22.36.44.png",
        alt: "ElioAI assistant completing health and insurance actions",
        exploreId: "assistant",
        detailBody: [
            "Use a simple conversation to ask about your next medication, review saved insurance details, locate a recent record, or understand what is scheduled for the day. ElioAI draws from the information already organized in Elio, helping you reach the right detail with fewer steps.",
            "The assistant can also guide common actions such as updating health information, saving a record, or checking an existing routine. Responses stay connected to the same request, so you can move from a question to the relevant task without navigating through several screens.",
        ],
    },
];

const EXPLORE_CARDS: ExploreCard[] = [
    {
        id: "assistant",
        title: "Your health, understood",
        summary:
            "Bring medications, records, insurance, and daily updates together, then see what needs your attention.",
        kind: "assistant",
        tone: "light",
        layout:
            "md:col-span-2 md:min-h-[430px] lg:col-span-7 lg:row-span-2 lg:col-start-6 lg:row-start-1 lg:min-h-0",
    },
    {
        id: "insurance",
        title: "Insurance in one place",
        summary:
            "Keep PhilHealth, life coverage, digital cards, and deductible details organized.",
        kind: "insurance",
        tone: "light",
        layout: "md:col-span-2 lg:col-span-5 lg:col-start-1 lg:row-start-1",
    },
    {
        id: "medications",
        title: "Medication routines",
        summary:
            "Track each dose, schedule, instruction, and completion status throughout your day.",
        kind: "medications",
        tone: "light",
        layout: "lg:col-span-3 lg:col-start-1 lg:row-start-2",
    },
    {
        id: "offline",
        title: "Works offline",
        summary:
            "Open essential health information even when your connection drops.",
        kind: "offline",
        tone: "light",
        layout: "lg:col-span-2 lg:col-start-4 lg:row-start-2",
    },
    {
        id: "vault",
        title: "Health Vault",
        summary:
            "Store prescriptions, laboratory results, and important medical files in one secure place.",
        kind: "vault",
        tone: "navy",
        layout:
            "md:col-span-2 md:min-h-[430px] lg:col-span-5 lg:row-span-2 lg:col-start-1 lg:row-start-3 lg:min-h-0",
    },
    {
        id: "actions",
        title: "Quick health actions",
        summary:
            "Add medications, save records, set reminders, and check coverage with fewer steps.",
        kind: "actions",
        tone: "light",
        layout: "md:col-span-2 lg:col-span-7 lg:col-start-6 lg:row-start-3",
    },
    {
        id: "daily",
        title: "Daily overview",
        summary:
            "See upcoming medications, reminders, and recent activity at a glance.",
        kind: "daily",
        tone: "light",
        layout: "lg:col-span-4 lg:col-start-6 lg:row-start-4",
    },
    {
        id: "faq",
        title: "Clear answers",
        summary:
            "Understand privacy, offline access, stored records, and the purpose of each Elio feature.",
        kind: "faq",
        tone: "light",
        layout: "lg:col-span-3 lg:col-start-10 lg:row-start-4",
    },
];

const INTRO_EASE: [number, number, number, number] = [0.18, 0.88, 0.24, 1];

const SOFT_EASE: [number, number, number, number] = [0.2, 0.78, 0.24, 1];

const EXPLORE_ICONS: Record<ExploreKind, LucideIcon> = {
    assistant: MessageCircleHeart,
    insurance: ShieldCheck,
    medications: Pill,
    offline: WifiOff,
    vault: FolderLock,
    actions: Sparkles,
    daily: CalendarClock,
    faq: CircleHelp,
};

function ExploreIcon({
                         kind,
                         className = "h-5 w-5",
                     }: {
    kind: ExploreKind;
    className?: string;
}) {
    const Icon = EXPLORE_ICONS[kind];

    return <Icon aria-hidden="true" className={className} strokeWidth={2} />;
}

function ExploreVisual({
                           kind,
                           reduceMotion,
                       }: {
    kind: ExploreKind;
    reduceMotion: boolean;
}) {
    const reveal = {
        duration: reduceMotion ? 0 : 0.88,
        ease: INTRO_EASE,
    } as const;

    if (kind === "assistant") {
        return (
            <div className="relative min-h-[190px] w-full sm:min-h-[218px]">
                <motion.div
                    initial={
                        reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: 28,
                                y: 12,
                                scale: 0.96,
                                filter: "blur(12px)",
                            }
                    }
                    animate={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                    }}
                    transition={{
                        ...reveal,
                        delay: reduceMotion ? 0 : 0.32,
                    }}
                    className="absolute inset-x-0 top-0 flex justify-end"
                >
                    <div className="max-w-[78%] rounded-[22px_22px_7px_22px] bg-[#062541] px-5 py-3.5 text-[14px] font-medium leading-5 text-white shadow-[0_18px_38px_-28px_rgba(6,37,65,0.65)] sm:text-[15px]">
                        When is my next medication?
                    </div>
                </motion.div>

                <motion.div
                    initial={
                        reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: -24,
                                y: 18,
                                scale: 0.96,
                                filter: "blur(12px)",
                            }
                    }
                    animate={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                    }}
                    transition={{
                        ...reveal,
                        delay: reduceMotion ? 0 : 0.46,
                    }}
                    className="absolute inset-x-0 bottom-0 flex items-end justify-start gap-3 pr-[8%]"
                >
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white shadow-[0_10px_24px_-18px_rgba(6,37,65,0.5)] ring-1 ring-black/5 sm:h-12 sm:w-12">
                        <Image
                            src="/assets/elio-icon.png"
                            alt="Elio"
                            fill
                            unoptimized
                            draggable={false}
                            sizes="48px"
                            className="select-none object-cover"
                        />
                    </div>

                    <div className="max-w-[460px] rounded-[22px_22px_22px_7px] bg-[#edf4f7] px-5 py-4 text-[#284355]">
                        <p className="text-[14px] font-semibold text-[#062541] sm:text-[15px]">
                            Your next dose is at 8:00 PM
                        </p>

                        <p className="mt-1 text-[13px] leading-5 text-[#617482] sm:text-[14px]">
                            Take Metformin, 500 mg, with dinner. I will keep it in
                            your daily overview.
                        </p>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (kind === "insurance") {
        return (
            <div className="relative h-[84px]">
                <motion.div
                    initial={
                        reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: 34,
                                y: 10,
                                rotate: 0,
                                scale: 0.9,
                                filter: "blur(10px)",
                            }
                    }
                    animate={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                        rotate: -6,
                        scale: 1,
                        filter: "blur(0px)",
                    }}
                    transition={{
                        ...reveal,
                        delay: reduceMotion ? 0 : 0.28,
                    }}
                    className="absolute right-8 top-0 h-[70px] w-[132px] rounded-[16px] bg-[linear-gradient(135deg,#fffdf7_0%,#efe3c5_58%,#fffdf8_100%)] p-3.5 text-[#6d592b] shadow-[0_18px_34px_-25px_rgba(109,89,43,0.42)] ring-1 ring-[#d5c69f]/55"
                >
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em]">
                        Life
                    </p>
                    <p className="mt-4 text-[12px] font-semibold">
                        Protection plan
                    </p>
                </motion.div>

                <motion.div
                    initial={
                        reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: 42,
                                y: 12,
                                rotate: 0,
                                scale: 0.9,
                                filter: "blur(10px)",
                            }
                    }
                    animate={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                        rotate: 3,
                        scale: 1,
                        filter: "blur(0px)",
                    }}
                    transition={{
                        ...reveal,
                        delay: reduceMotion ? 0 : 0.4,
                    }}
                    className="absolute right-0 top-3 h-[72px] w-[140px] rounded-[16px] bg-[#16895b] p-3.5 text-white shadow-[0_20px_36px_-25px_rgba(22,137,91,0.58)]"
                >
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em]">
                        PhilHealth
                    </p>
                    <p className="mt-4 text-[12px] font-semibold">
                        Coverage ready
                    </p>
                </motion.div>
            </div>
        );
    }

    if (kind === "medications") {
        return (
            <div className="flex items-center gap-3">
                <motion.div
                    initial={
                        reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: -18,
                                rotate: -18,
                                scale: 0.82,
                                filter: "blur(8px)",
                            }
                    }
                    animate={{
                        opacity: 1,
                        x: 0,
                        rotate: -7,
                        scale: 1,
                        filter: "blur(0px)",
                    }}
                    transition={{
                        ...reveal,
                        delay: reduceMotion ? 0 : 0.28,
                    }}
                    className="flex h-12 w-[92px] overflow-hidden rounded-full shadow-[0_14px_26px_-20px_rgba(0,0,0,0.5)]"
                >
                    <span className="w-1/2 bg-[#f1b7b7]" />
                    <span className="w-1/2 bg-[#fff4e9]" />
                </motion.div>

                <motion.div
                    initial={
                        reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: 18,
                                rotate: 17,
                                scale: 0.82,
                                filter: "blur(8px)",
                            }
                    }
                    animate={{
                        opacity: 1,
                        x: 0,
                        rotate: 6,
                        scale: 1,
                        filter: "blur(0px)",
                    }}
                    transition={{
                        ...reveal,
                        delay: reduceMotion ? 0 : 0.4,
                    }}
                    className="flex h-10 w-[74px] overflow-hidden rounded-full shadow-[0_14px_26px_-20px_rgba(0,0,0,0.5)]"
                >
                    <span className="w-1/2 bg-[#8dc6de]" />
                    <span className="w-1/2 bg-[#eaf8fd]" />
                </motion.div>
            </div>
        );
    }

    if (kind === "offline") {
        return (
            <motion.div
                initial={
                    reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 18,
                            scale: 0.94,
                            filter: "blur(10px)",
                        }
                }
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                }}
                transition={{
                    ...reveal,
                    delay: reduceMotion ? 0 : 0.3,
                }}
                className="flex items-center gap-4"
            >
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#eaf1f4] text-[#2d6d83]">
                    <WifiOff
                        aria-hidden="true"
                        className="h-6 w-6"
                        strokeWidth={2}
                    />
                </div>

                <div>
                    <p className="text-[13px] font-semibold text-[#173d4e]">
                        Saved on device
                    </p>
                    <p className="mt-1 text-[12px] text-[#6d7d86]">
                        Ready without Wi-Fi
                    </p>
                </div>
            </motion.div>
        );
    }

    if (kind === "vault") {
        return (
            <div className="relative min-h-[188px] overflow-hidden sm:min-h-[218px]">
                <motion.div
                    initial={
                        reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: -26,
                                y: 48,
                                scale: 0.92,
                                filter: "blur(14px)",
                            }
                    }
                    animate={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                    }}
                    transition={{
                        ...reveal,
                        delay: reduceMotion ? 0 : 0.3,
                    }}
                    className="absolute -bottom-[168px] left-0 h-[336px] w-[154px] overflow-hidden rounded-[36px] bg-[#dff3ff] shadow-[0_22px_44px_-28px_rgba(0,0,0,0.78)] ring-1 ring-white/20 sm:-bottom-[200px] sm:h-[400px] sm:w-[184px] sm:rounded-[42px]"
                >
                    <Image
                        src="/assets/Simulator Screenshot - iPhone 17 - 2026-07-10 at 22.24.19.png"
                        alt="Elio Health Vault displayed on a phone"
                        fill
                        unoptimized
                        quality={100}
                        draggable={false}
                        sizes="(max-width: 639px) 154px, 184px"
                        className="select-none object-cover object-top"
                    />
                </motion.div>

                <div className="absolute inset-y-0 right-0 w-[42%] sm:w-[46%]">
                    <motion.div
                        initial={
                            reduceMotion
                                ? false
                                : {
                                    opacity: 0,
                                    x: 30,
                                    y: 24,
                                    rotate: 0,
                                    scale: 0.9,
                                    filter: "blur(12px)",
                                }
                        }
                        animate={{
                            opacity: 1,
                            x: 0,
                            y: 0,
                            rotate: -4,
                            scale: 1,
                            filter: "blur(0px)",
                        }}
                        transition={{
                            ...reveal,
                            delay: reduceMotion ? 0 : 0.42,
                        }}
                        className="absolute bottom-[22px] right-[66px] z-10 grid h-[104px] w-[88px] place-items-center rounded-[20px] bg-white/12 text-white ring-1 ring-white/15 backdrop-blur-md sm:bottom-[30px] sm:right-[82px] sm:h-[126px] sm:w-[104px] sm:rounded-[22px]"
                    >
                        <FileHeart
                            aria-hidden="true"
                            className="h-8 w-8"
                            strokeWidth={1.8}
                        />
                    </motion.div>

                    <motion.div
                        initial={
                            reduceMotion
                                ? false
                                : {
                                    opacity: 0,
                                    x: 34,
                                    y: 34,
                                    rotate: 0,
                                    scale: 0.9,
                                    filter: "blur(12px)",
                                }
                        }
                        animate={{
                            opacity: 1,
                            x: 0,
                            y: 0,
                            rotate: 4,
                            scale: 1,
                            filter: "blur(0px)",
                        }}
                        transition={{
                            ...reveal,
                            delay: reduceMotion ? 0 : 0.54,
                        }}
                        className="absolute bottom-0 right-0 z-20 grid h-[112px] w-[94px] place-items-center rounded-[21px] bg-white text-[#062541] shadow-[0_22px_44px_-30px_rgba(0,0,0,0.78)] sm:h-[138px] sm:w-[116px] sm:rounded-[24px]"
                    >
                        <FileText
                            aria-hidden="true"
                            className="h-9 w-9"
                            strokeWidth={1.8}
                        />
                    </motion.div>
                </div>
            </div>
        );
    }

    if (kind === "actions") {
        return (
            <div className="flex flex-wrap gap-2.5">
                {[
                    "Add medication",
                    "Save a record",
                    "Check coverage",
                    "Set a reminder",
                ].map((label, index) => (
                    <motion.span
                        key={label}
                        initial={
                            reduceMotion
                                ? false
                                : {
                                    opacity: 0,
                                    y: 16,
                                    scale: 0.92,
                                    filter: "blur(8px)",
                                }
                        }
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            filter: "blur(0px)",
                        }}
                        transition={{
                            ...reveal,
                            delay: reduceMotion ? 0 : 0.26 + index * 0.08,
                        }}
                        className="rounded-full bg-[#eef3f5] px-4 py-2 text-[12px] font-semibold text-[#315260] sm:text-[13px]"
                    >
                        {label}
                    </motion.span>
                ))}
            </div>
        );
    }

    if (kind === "daily" || kind === "faq") {
        return null;
    }

    return null;
}

function ExploreCardItem({
                             item,
                             focused,
                             reduceMotion,
                         }: {
    item: ExploreCard;
    focused: boolean;
    reduceMotion: boolean;
}) {
    const dark = item.tone === "navy";

    const cardVariants: Variants = {
        hidden: reduceMotion
            ? {}
            : {
                opacity: 0.08,
                y: 48,
                scale: 0.95,
                filter: "blur(30px)",
            },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                opacity: {
                    duration: reduceMotion ? 0 : 1.05,
                    delay: reduceMotion ? 0 : 0.16,
                    ease: SOFT_EASE,
                },
                filter: {
                    duration: reduceMotion ? 0 : 1.28,
                    ease: INTRO_EASE,
                },
                y: {
                    duration: reduceMotion ? 0 : 1.16,
                    ease: INTRO_EASE,
                },
                scale: {
                    duration: reduceMotion ? 0 : 1.16,
                    ease: INTRO_EASE,
                },
            },
        },
    };

    return (
        <motion.article
            data-explore-card={item.id}
            variants={cardVariants}
            whileHover={
                reduceMotion
                    ? undefined
                    : {
                        y: -4,
                        transition: {
                            duration: 0.32,
                            ease: SOFT_EASE,
                        },
                    }
            }
            className={`relative min-h-[260px] overflow-hidden rounded-[30px] sm:min-h-[275px] sm:rounded-[34px] lg:min-h-0 ${
                item.kind === "vault"
                    ? "px-6 pt-6 pb-0 sm:px-7 sm:pt-7 sm:pb-0"
                    : "p-6 sm:p-7"
            } ${item.layout} ${
                dark
                    ? "bg-[#062541] text-white shadow-[0_22px_50px_-38px_rgba(6,37,65,0.85)]"
                    : "bg-white text-[#101c2b] shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
            } ${
                focused
                    ? dark
                        ? "ring-2 ring-white/35 ring-offset-4 ring-offset-[#f5f5f7]"
                        : "ring-2 ring-[#7fa9ba]/35 ring-offset-4 ring-offset-[#f5f5f7]"
                    : ""
            }`}
        >
            <div className="relative z-10 flex h-full min-h-0 flex-col">
                <div
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-[15px] ${
                        dark
                            ? "bg-white/12 text-white"
                            : "bg-[#eaf1f4] text-[#2f6f84]"
                    }`}
                >
                    <ExploreIcon kind={item.kind} />
                </div>

                <div className="mt-5 max-w-[570px]">
                    <h2 className="font-display text-[24px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[27px]">
                        {item.title}
                    </h2>

                    <p
                        className={`mt-3 max-w-[540px] text-[14px] leading-[1.52] sm:text-[15px] ${
                            dark ? "text-white/72" : "text-[#5f6977]"
                        }`}
                    >
                        {item.summary}
                    </p>
                </div>

                {item.kind !== "daily" && item.kind !== "faq" ? (
                    <div className="mt-auto pt-7">
                        <ExploreVisual
                            kind={item.kind}
                            reduceMotion={reduceMotion}
                        />
                    </div>
                ) : null}
            </div>
        </motion.article>
    );
}

function ExploreGrid({ focusedItemId }: ExploreGridProps) {
    const reduceMotion = useReducedMotion() ?? false;

    const gridVariants: Variants = {
        hidden: {},
        show: {
            transition: {
                delayChildren: reduceMotion ? 0 : 0.08,
                staggerChildren: reduceMotion ? 0 : 0.075,
            },
        },
    };

    return (
        <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:auto-rows-[250px] lg:grid-cols-12 lg:gap-5 xl:auto-rows-[260px] xl:gap-6"
        >
            {EXPLORE_CARDS.map((item) => (
                <ExploreCardItem
                    key={item.id}
                    item={item}
                    focused={focusedItemId === item.id}
                    reduceMotion={reduceMotion}
                />
            ))}
        </motion.div>
    );
}

function FeatureDetail({ feature, reduceMotion }: FeatureDetailProps) {
    return (
        <div className="grid min-h-[690px] items-center gap-12 py-2 sm:min-h-[760px] sm:gap-16 lg:grid-cols-[minmax(360px,0.92fr)_minmax(0,1.08fr)] lg:gap-16 lg:py-0 xl:gap-24">
            <motion.div
                initial={
                    reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            x: -52,
                            y: 28,
                            scale: 0.92,
                            filter: "blur(34px)",
                        }
                }
                animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                }}
                transition={{
                    opacity: {
                        duration: reduceMotion ? 0 : 0.9,
                        delay: reduceMotion ? 0 : 0.12,
                        ease: SOFT_EASE,
                    },
                    filter: {
                        duration: reduceMotion ? 0 : 1.2,
                        ease: INTRO_EASE,
                    },
                    x: {
                        duration: reduceMotion ? 0 : 1.05,
                        ease: INTRO_EASE,
                    },
                    y: {
                        duration: reduceMotion ? 0 : 1.05,
                        ease: INTRO_EASE,
                    },
                    scale: {
                        duration: reduceMotion ? 0 : 1.05,
                        ease: INTRO_EASE,
                    },
                }}
                className="relative flex min-h-[600px] items-center justify-center sm:min-h-[690px] lg:min-h-[760px]"
            >
                <motion.div
                    aria-hidden="true"
                    initial={
                        reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                scale: 0.72,
                                filter: "blur(70px)",
                            }
                    }
                    animate={{
                        opacity: 1,
                        scale: 1,
                        filter: "blur(44px)",
                    }}
                    transition={{
                        duration: reduceMotion ? 0 : 1.4,
                        delay: reduceMotion ? 0 : 0.16,
                        ease: INTRO_EASE,
                    }}
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[410px] w-[410px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white sm:h-[500px] sm:w-[500px] lg:h-[570px] lg:w-[570px]"
                />

                <motion.div
                    whileHover={
                        reduceMotion
                            ? undefined
                            : {
                                y: -6,
                                scale: 1.008,
                                transition: {
                                    duration: 0.42,
                                    ease: SOFT_EASE,
                                },
                            }
                    }
                    className="relative aspect-[941/2048] w-[278px] overflow-hidden rounded-[48px] bg-[#dff3ff] shadow-[0_34px_80px_-36px_rgba(0,0,0,0.46)] ring-1 ring-black/10 sm:w-[328px] sm:rounded-[56px] lg:w-[360px] lg:rounded-[62px] xl:w-[388px] xl:rounded-[66px]"
                >
                    <Image
                        src={feature.image}
                        alt={feature.alt}
                        fill
                        priority
                        unoptimized
                        quality={100}
                        draggable={false}
                        sizes="(max-width: 639px) 278px, (max-width: 1023px) 328px, (max-width: 1279px) 360px, 388px"
                        className="select-none object-cover object-top"
                    />
                </motion.div>
            </motion.div>

            <motion.div
                initial={
                    reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            x: 54,
                            y: 24,
                            scale: 0.97,
                            filter: "blur(32px)",
                        }
                }
                animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                }}
                transition={{
                    opacity: {
                        duration: reduceMotion ? 0 : 0.9,
                        delay: reduceMotion ? 0 : 0.22,
                        ease: SOFT_EASE,
                    },
                    filter: {
                        duration: reduceMotion ? 0 : 1.2,
                        delay: reduceMotion ? 0 : 0.06,
                        ease: INTRO_EASE,
                    },
                    x: {
                        duration: reduceMotion ? 0 : 1.08,
                        delay: reduceMotion ? 0 : 0.06,
                        ease: INTRO_EASE,
                    },
                    y: {
                        duration: reduceMotion ? 0 : 1.08,
                        delay: reduceMotion ? 0 : 0.06,
                        ease: INTRO_EASE,
                    },
                    scale: {
                        duration: reduceMotion ? 0 : 1.08,
                        delay: reduceMotion ? 0 : 0.06,
                        ease: INTRO_EASE,
                    },
                }}
                className="mx-auto max-w-[660px] lg:mx-0 lg:pr-8"
            >
                <div className="max-w-[650px] space-y-5 text-[17px] leading-[1.72] tracking-[-0.01em] text-[#454549] sm:text-[19px]">
                    <p className="font-medium text-[#252528]">
                        {feature.topic}. {feature.headline} {feature.body}
                    </p>

                    {feature.detailBody.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

function FeatureCarousel({ onExplore }: FeatureCarouselProps) {
    const scrollerRef = useRef<HTMLUListElement>(null);
    const scrollAnimationRef = useRef<number | null>(null);
    const scrollTargetIndexRef = useRef(0);
    const isArrowScrollingRef = useRef(false);
    const reduceMotion = useReducedMotion() ?? false;

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollState = useCallback(() => {
        const scroller = scrollerRef.current;

        if (!scroller) {
            return;
        }

        const cards = Array.from(
            scroller.querySelectorAll<HTMLElement>("[data-feature-card]"),
        );

        const maximumScroll = Math.max(
            scroller.scrollWidth - scroller.clientWidth,
            0,
        );

        setCanScrollLeft(scroller.scrollLeft > 2);
        setCanScrollRight(scroller.scrollLeft < maximumScroll - 2);

        if (cards.length === 0) {
            return;
        }

        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card, index) => {
            const distance = Math.abs(card.offsetLeft - scroller.scrollLeft);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        if (!isArrowScrollingRef.current) {
            scrollTargetIndexRef.current = closestIndex;
        }
    }, []);

    useEffect(() => {
        const scroller = scrollerRef.current;

        if (!scroller) {
            return;
        }

        let frame = 0;

        const scheduleUpdate = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(updateScrollState);
        };

        const resizeObserver = new ResizeObserver(scheduleUpdate);

        scroller.addEventListener("scroll", scheduleUpdate, {
            passive: true,
        });

        window.addEventListener("resize", scheduleUpdate);

        resizeObserver.observe(scroller);
        scheduleUpdate();

        return () => {
            cancelAnimationFrame(frame);

            if (scrollAnimationRef.current !== null) {
                cancelAnimationFrame(scrollAnimationRef.current);
            }

            scroller.style.removeProperty("scroll-snap-type");
            scroller.removeEventListener("scroll", scheduleUpdate);
            window.removeEventListener("resize", scheduleUpdate);
            resizeObserver.disconnect();
        };
    }, [updateScrollState]);

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

            const targetIndex = Math.min(
                Math.max(
                    scrollTargetIndexRef.current + direction,
                    0,
                ),
                cards.length - 1,
            );
            const targetLeft = cards[targetIndex].offsetLeft;

            scrollTargetIndexRef.current = targetIndex;

            if (scrollAnimationRef.current !== null) {
                cancelAnimationFrame(scrollAnimationRef.current);
            }

            if (reduceMotion) {
                scroller.scrollLeft = targetLeft;
                return;
            }

            const startLeft = scroller.scrollLeft;
            const distance = targetLeft - startLeft;
            const duration = 720;
            const startedAt = performance.now();

            isArrowScrollingRef.current = true;
            scroller.style.scrollSnapType = "none";

            const animateScroll = (now: number) => {
                const progress = Math.min((now - startedAt) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 4);

                scroller.scrollLeft = startLeft + distance * eased;

                if (progress < 1) {
                    scrollAnimationRef.current = requestAnimationFrame(
                        animateScroll,
                    );
                    return;
                }

                scroller.scrollLeft = targetLeft;
                scroller.style.removeProperty("scroll-snap-type");
                isArrowScrollingRef.current = false;
                scrollAnimationRef.current = null;
            };

            scrollAnimationRef.current = requestAnimationFrame(animateScroll);
        },
        [reduceMotion],
    );

    return (
        <>
            <div className="relative">
                <ul
                    ref={scrollerRef}
                    className="flex snap-x snap-proximity gap-5 overflow-x-auto overscroll-x-contain pb-3 pr-[16vw] sm:gap-6 sm:pr-[14vw] lg:pr-[12vw] [-ms-overflow-style:none] [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden"
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
                                        scale: 0.95,
                                        filter: "blur(22px)",
                                    }
                            }
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                filter: "blur(0px)",
                            }}
                            transition={{
                                opacity: {
                                    duration: reduceMotion ? 0 : 1.24,
                                    delay: reduceMotion
                                        ? 0
                                        : 0.08 + index * 0.08,
                                    ease: INTRO_EASE,
                                },
                                filter: {
                                    duration: reduceMotion ? 0 : 1.02,
                                    delay: reduceMotion ? 0 : index * 0.07,
                                    ease: INTRO_EASE,
                                },
                                y: {
                                    duration: reduceMotion ? 0 : 1.12,
                                    delay: reduceMotion ? 0 : index * 0.07,
                                    ease: INTRO_EASE,
                                },
                                scale: {
                                    duration: reduceMotion ? 0 : 1.12,
                                    delay: reduceMotion ? 0 : index * 0.07,
                                    ease: INTRO_EASE,
                                },
                            }}
                            className="h-[600px] w-[86vw] max-w-[420px] shrink-0 snap-start sm:h-[630px] sm:w-[400px] lg:h-[660px] lg:w-[420px]"
                        >
                            <article
                                className="group relative grid h-full grid-rows-[296px_304px] overflow-hidden rounded-[30px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.025)] transition-[transform,box-shadow] duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_16px_45px_-30px_rgba(0,0,0,0.28)] sm:grid-rows-[304px_326px] lg:grid-rows-[312px_348px]"
                            >
                                <div className="relative z-10 px-7 pt-8 sm:px-8 sm:pt-9">
                                    <p className="text-[15px] font-semibold leading-none text-[#1d1d1f]">
                                        {feature.topic}
                                    </p>

                                    <h2 className="mt-5 max-w-[345px] font-display text-[28px] font-semibold leading-[1.06] tracking-[-0.04em] text-[#1d1d1f] sm:text-[30px] lg:text-[31px]">
                                        {feature.headline}
                                    </h2>

                                    <p className="mt-4 max-w-[345px] text-[16px] leading-[1.45] text-[#424245] sm:text-[17px]">
                                        {feature.body}
                                    </p>
                                </div>

                                <div className="relative overflow-hidden">
                                    <div className="absolute left-1/2 top-0 aspect-[941/2048] w-[280px] -translate-x-1/2 overflow-hidden rounded-[48px] bg-[#dff3ff] shadow-[0_18px_45px_-24px_rgba(0,0,0,0.45)] ring-1 ring-black/10 transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.018] sm:w-[300px] sm:rounded-[52px] lg:w-[320px] lg:rounded-[56px]">
                                        <Image
                                            src={feature.image}
                                            alt={feature.alt}
                                            fill
                                            priority={index < 2}
                                            unoptimized
                                            quality={100}
                                            draggable={false}
                                            sizes="(max-width: 739px) 280px, (max-width: 923px) 300px, 320px"
                                            className="select-none object-cover object-top transition-transform duration-[1300ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.008]"
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    type="button"
                                    onClick={() =>
                                        onExplore(feature.id)
                                    }
                                    aria-label={`Explore ${feature.topic}`}
                                    whileTap={{
                                        scale: 0.9,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 420,
                                        damping: 28,
                                    }}
                                    className="absolute bottom-5 right-5 z-20 grid h-11 w-11 place-items-center rounded-full bg-[#e8e8ed]/95 text-[#6e6e73] backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 hover:bg-[#1d1d1f] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
                                >
                                    <Plus
                                        aria-hidden="true"
                                        className="h-[22px] w-[22px]"
                                        strokeWidth={2}
                                    />
                                </motion.button>
                            </article>
                        </motion.li>
                    ))}
                </ul>

                <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-y-0 left-0 z-20 w-[80px] bg-gradient-to-r from-[#f5f5f7] via-[#f5f5f7]/78 to-transparent transition-opacity duration-500 sm:w-[120px] ${
                        canScrollLeft ? "opacity-100" : "opacity-0"
                    }`}
                />

                <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-y-0 right-0 z-20 w-[80px] bg-gradient-to-l from-[#f5f5f7] via-[#f5f5f7]/78 to-transparent transition-opacity duration-500 sm:w-[120px] ${
                        canScrollRight ? "opacity-100" : "opacity-0"
                    }`}
                />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
                <motion.button
                    type="button"
                    aria-label="Previous Elio feature"
                    onClick={() => scrollByCard(-1)}
                    disabled={!canScrollLeft}
                    whileTap={
                        canScrollLeft
                            ? {
                                scale: 0.9,
                            }
                            : undefined
                    }
                    transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 28,
                    }}
                    className="grid h-11 w-11 place-items-center rounded-full bg-[#e8e8ed] text-[#6e6e73] transition-[background-color,color,opacity] duration-300 hover:bg-[#d2d2d7] hover:text-[#1d1d1f] disabled:cursor-default disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
                >
                    <ChevronLeft
                        aria-hidden="true"
                        className="h-5 w-5"
                        strokeWidth={2.25}
                    />
                </motion.button>

                <motion.button
                    type="button"
                    aria-label="Next Elio feature"
                    onClick={() => scrollByCard(1)}
                    disabled={!canScrollRight}
                    whileTap={
                        canScrollRight
                            ? {
                                scale: 0.9,
                            }
                            : undefined
                    }
                    transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 28,
                    }}
                    className="grid h-11 w-11 place-items-center rounded-full bg-[#e8e8ed] text-[#6e6e73] transition-[background-color,color,opacity] duration-300 hover:bg-[#d2d2d7] hover:text-[#1d1d1f] disabled:cursor-default disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
                >
                    <ChevronRight
                        aria-hidden="true"
                        className="h-5 w-5"
                        strokeWidth={2.25}
                    />
                </motion.button>
            </div>
        </>
    );
}

export default function Hero() {
    const reduceMotion = useReducedMotion() ?? false;

    const [view, setView] = useState<HeroView>("features");
    const [focusedItemId, setFocusedItemId] = useState<string | null>(null);
    const [selectedFeatureId, setSelectedFeatureId] = useState(FEATURES[0].id);
    const [exploreRevealKey, setExploreRevealKey] = useState(0);
    const [detailRevealKey, setDetailRevealKey] = useState(0);
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

    const selectedFeature =
        FEATURES.find((feature) => feature.id === selectedFeatureId) ?? FEATURES[0];

    const showExplore = useCallback(() => {
        setFocusedItemId(null);
        setExploreRevealKey((current) => current + 1);
        setView("explore");
    }, []);

    const showDetail = useCallback((featureId: string) => {
        setSelectedFeatureId(featureId);
        setFocusedItemId(null);
        setDetailRevealKey((current) => current + 1);
        setView("detail");
    }, []);

    const showFeatures = useCallback(() => {
        setFocusedItemId(null);
        setView("features");
    }, []);

    const toggleView = useCallback(() => {
        if (view === "features") {
            showExplore();
            return;
        }

        showFeatures();
    }, [showExplore, showFeatures, view]);

    return (
        <>
        <motion.section
            id="home"
            aria-labelledby="elio-features-heading"
            initial={
                reduceMotion
                    ? false
                    : {
                        opacity: 0.06,
                        y: 28,
                        scale: 0.988,
                        filter: "blur(42px)",
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
                amount: 0.06,
            }}
            transition={{
                opacity: {
                    duration: reduceMotion ? 0 : 1.42,
                    delay: reduceMotion ? 0 : 0.2,
                    ease: SOFT_EASE,
                },
                filter: {
                    duration: reduceMotion ? 0 : 1.85,
                    ease: INTRO_EASE,
                },
                y: {
                    duration: reduceMotion ? 0 : 1.55,
                    ease: INTRO_EASE,
                },
                scale: {
                    duration: reduceMotion ? 0 : 1.55,
                    ease: INTRO_EASE,
                },
            }}
            className="relative overflow-hidden bg-[#f5f5f7] py-14 sm:py-[52px] lg:py-14"
        >
            <motion.div
                aria-hidden="true"
                initial={
                    reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            scale: 0.7,
                            filter: "blur(100px)",
                        }
                }
                whileInView={{
                    opacity: 0.9,
                    scale: 1,
                    filter: "blur(54px)",
                }}
                viewport={{
                    once: true,
                    amount: 0.06,
                }}
                transition={{
                    duration: reduceMotion ? 0 : 2.3,
                    ease: INTRO_EASE,
                }}
                className="pointer-events-none absolute left-1/2 top-[-60px] h-[460px] w-[82vw] max-w-[1180px] -translate-x-1/2 rounded-full bg-white/85"
            />

            <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
                <nav
                    aria-label="Elio primary"
                    className="mb-9 flex items-center justify-between gap-5 border-b border-black/[0.07] pb-5 sm:mb-11 sm:pb-6"
                >
                    <motion.div
                        initial={
                            reduceMotion
                                ? false
                                : {
                                    opacity: 0,
                                    y: 30,
                                    scale: 0.975,
                                    filter: "blur(22px)",
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
                            amount: 0.3,
                        }}
                        transition={{
                            duration: reduceMotion ? 0 : 1.45,
                            delay: reduceMotion ? 0 : 0.12,
                            ease: INTRO_EASE,
                        }}
                        className="shrink-0"
                    >
                        <Image
                            src="/elio-icon-v5.png"
                            alt="Elio"
                            width={58}
                            height={58}
                            priority
                            draggable={false}
                            className="h-[38px] w-auto sm:h-[48px]"
                        />
                    </motion.div>

                    <motion.button
                        type="button"
                        onClick={() => setIsWaitlistOpen(true)}
                        initial={
                            reduceMotion
                                ? false
                                : {
                                    opacity: 0,
                                    x: 18,
                                    filter: "blur(14px)",
                                }
                        }
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            filter: "blur(0px)",
                        }}
                        viewport={{
                            once: true,
                            amount: 0.3,
                        }}
                        transition={{
                            duration: reduceMotion ? 0 : 1.25,
                            delay: reduceMotion ? 0 : 0.28,
                            ease: INTRO_EASE,
                        }}
                        className="inline-flex h-10 shrink-0 items-center rounded-full bg-black px-5 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f7] sm:h-11 sm:px-6 sm:text-[15px]"
                    >
                        Join waitlist
                    </motion.button>
                </nav>

                <div className="mb-10 flex flex-col items-start gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between sm:gap-7 lg:mb-14">
                    <motion.h1
                        id="elio-features-heading"
                        initial={
                            reduceMotion
                                ? false
                                : {
                                    opacity: 0,
                                    y: 30,
                                    scale: 0.975,
                                    filter: "blur(22px)",
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
                            amount: 0.3,
                        }}
                        transition={{
                            duration: reduceMotion ? 0 : 1.45,
                            delay: reduceMotion ? 0 : 0.12,
                            ease: INTRO_EASE,
                        }}
                        className="max-w-[760px] min-w-0 font-display text-[38px] font-semibold leading-[1.04] tracking-[-0.045em] text-[#1d1d1f] sm:text-[48px] lg:text-[58px]"
                    >
                        Why Elio makes managing your health easier.
                    </motion.h1>

                    <motion.div
                        initial={
                            reduceMotion
                                ? false
                                : {
                                    opacity: 0,
                                    x: 18,
                                    filter: "blur(14px)",
                                }
                        }
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            filter: "blur(0px)",
                        }}
                        viewport={{
                            once: true,
                            amount: 0.3,
                        }}
                        transition={{
                            duration: reduceMotion ? 0 : 1.25,
                            delay: reduceMotion ? 0 : 0.28,
                            ease: INTRO_EASE,
                        }}
                        className="shrink-0 pb-1 sm:pb-2"
                    >
                        <button
                            type="button"
                            onClick={toggleView}
                            className="inline-flex items-center gap-1 bg-transparent p-0 text-[16px] font-medium text-[#0066cc] transition-colors duration-300 hover:text-[#004f9e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f5f5f7] sm:text-[17px]"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={view}
                                    initial={
                                        reduceMotion
                                            ? false
                                            : {
                                                opacity: 0,
                                                y: 5,
                                                filter: "blur(6px)",
                                            }
                                    }
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        filter: "blur(0px)",
                                    }}
                                    exit={
                                        reduceMotion
                                            ? undefined
                                            : {
                                                opacity: 0,
                                                y: -4,
                                                filter: "blur(6px)",
                                            }
                                    }
                                    transition={{
                                        duration: reduceMotion ? 0 : 0.28,
                                        ease: SOFT_EASE,
                                    }}
                                >
                                    {view === "features"
                                        ? "Explore Elio"
                                        : "Back to features"}
                                </motion.span>
                            </AnimatePresence>

                            <motion.span
                                aria-hidden="true"
                                animate={{
                                    rotate: view === "features" ? 0 : 180,
                                }}
                                transition={{
                                    duration: reduceMotion ? 0 : 0.42,
                                    ease: INTRO_EASE,
                                }}
                                className="text-[24px] leading-none"
                            >
                                ›
                            </motion.span>
                        </button>
                    </motion.div>
                </div>

                <motion.div
                    layout
                    transition={{
                        layout: {
                            duration: reduceMotion ? 0 : 0.7,
                            ease: INTRO_EASE,
                        },
                    }}
                    className="relative"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {view === "features" ? (
                            <motion.div
                                key="features"
                                initial={
                                    reduceMotion
                                        ? false
                                        : {
                                            opacity: 0,
                                            y: 18,
                                            scale: 0.988,
                                            filter: "blur(28px)",
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
                                        ? undefined
                                        : {
                                            opacity: 0,
                                            y: -10,
                                            scale: 0.985,
                                            filter: "blur(30px)",
                                        }
                                }
                                transition={{
                                    opacity: {
                                        duration: reduceMotion ? 0 : 0.4,
                                        delay: reduceMotion ? 0 : 0.08,
                                        ease: SOFT_EASE,
                                    },
                                    filter: {
                                        duration: reduceMotion ? 0 : 0.62,
                                        ease: INTRO_EASE,
                                    },
                                    y: {
                                        duration: reduceMotion ? 0 : 0.58,
                                        ease: INTRO_EASE,
                                    },
                                    scale: {
                                        duration: reduceMotion ? 0 : 0.58,
                                        ease: INTRO_EASE,
                                    },
                                }}
                            >
                                <FeatureCarousel onExplore={showDetail} />
                            </motion.div>
                        ) : view === "explore" ? (
                            <motion.div
                                key={`explore-${exploreRevealKey}`}
                                initial={
                                    reduceMotion
                                        ? false
                                        : {
                                            opacity: 0.06,
                                            y: 26,
                                            scale: 0.982,
                                            filter: "blur(38px)",
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
                                        ? undefined
                                        : {
                                            opacity: 0,
                                            y: -10,
                                            scale: 0.985,
                                            filter: "blur(30px)",
                                        }
                                }
                                transition={{
                                    opacity: {
                                        duration: reduceMotion ? 0 : 0.9,
                                        delay: reduceMotion ? 0 : 0.16,
                                        ease: SOFT_EASE,
                                    },
                                    filter: {
                                        duration: reduceMotion ? 0 : 1.18,
                                        ease: INTRO_EASE,
                                    },
                                    y: {
                                        duration: reduceMotion ? 0 : 1.02,
                                        ease: INTRO_EASE,
                                    },
                                    scale: {
                                        duration: reduceMotion ? 0 : 1.02,
                                        ease: INTRO_EASE,
                                    },
                                }}
                            >
                                <ExploreGrid
                                    focusedItemId={focusedItemId}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key={`detail-${selectedFeature.id}-${detailRevealKey}`}
                                initial={
                                    reduceMotion
                                        ? false
                                        : {
                                            opacity: 0.04,
                                            y: 22,
                                            scale: 0.978,
                                            filter: "blur(42px)",
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
                                        ? undefined
                                        : {
                                            opacity: 0,
                                            y: -12,
                                            scale: 0.982,
                                            filter: "blur(36px)",
                                        }
                                }
                                transition={{
                                    opacity: {
                                        duration: reduceMotion ? 0 : 0.78,
                                        delay: reduceMotion ? 0 : 0.12,
                                        ease: SOFT_EASE,
                                    },
                                    filter: {
                                        duration: reduceMotion ? 0 : 1.08,
                                        ease: INTRO_EASE,
                                    },
                                    y: {
                                        duration: reduceMotion ? 0 : 0.96,
                                        ease: INTRO_EASE,
                                    },
                                    scale: {
                                        duration: reduceMotion ? 0 : 0.96,
                                        ease: INTRO_EASE,
                                    },
                                }}
                            >
                                <FeatureDetail
                                    feature={selectedFeature}
                                    reduceMotion={reduceMotion}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

        </motion.section>

        <WaitlistModal
            open={isWaitlistOpen}
            onClose={() => setIsWaitlistOpen(false)}
        />
        </>
    );
}
