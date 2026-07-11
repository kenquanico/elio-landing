"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function WaitlistForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<FormStatus>("idle");

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
        <div className="w-full max-w-xl">
            {status === "success" ? (
                <div
                    role="status"
                    className="rounded-2xl bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-800"
                >
                    You’re on the Elio waitlist. We’ll email you when beta access is
                    ready.
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 sm:flex-row"
                >
                    <label htmlFor="waitlist-email" className="sr-only">
                        Email address
                    </label>

                    <input
                        id="waitlist-email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email"
                        autoComplete="email"
                        required
                        disabled={status === "submitting"}
                        className="min-h-14 flex-1 rounded-full border border-black/10 bg-white px-6 text-base text-black outline-none transition focus:border-black/30 focus:ring-4 focus:ring-black/5 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="min-h-14 rounded-full bg-black px-7 text-sm font-semibold text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {status === "submitting" ? "Joining..." : "Join waitlist"}
                    </button>
                </form>
            )}

            {status === "error" && (
                <p role="alert" className="mt-3 text-sm text-red-600">
                    We couldn’t add your email. Please try again.
                </p>
            )}

            <p className="mt-3 text-sm text-black/50">
                Beta invitations and important Elio updates only.
            </p>
        </div>
    );
}