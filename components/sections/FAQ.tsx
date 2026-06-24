"use client";

import { useState } from "react";
import FAQItem from "@/components/ui/FAQItem";
import Reveal from "@/components/ui/Reveal";

const faqs = [
  {
    title: "The Best Financial Accounting App Ever!",
    body: "Arcu at dictum sapien, mollis. Vulputate sit id accumsan, ultricies. In ultrices malesuada elit mauris etiam odio.",
  },
  {
    title: "How Does Uifry Keep My Data Safe?",
    body: "Your financial data is protected with industry-standard encryption and clear privacy controls that keep you in charge.",
  },
  {
    title: "Can I Connect Multiple Bank Accounts?",
    body: "Yes. Bring your accounts into one clear view, organize activity, and follow your goals without jumping between apps.",
  },
  {
    title: "The Best Financial Accounting App Ever!",
    body: "Track budgets, recurring expenses, and financial progress through an interface designed to stay simple as your needs grow.",
  },
  {
    title: "Does Uifry Work Across My Devices?",
    body: "Your experience stays in sync so you can check balances and make informed decisions wherever your day takes you.",
  },
  {
    title: "Can I Customize My Budgeting Intervals?",
    body: "Choose the cadence that fits your life and adjust categories, limits, and alerts whenever your priorities change.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="page-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">FAQ</p>
          <h2 className="section-heading uppercase">
            Frequently Asked Questions
          </h2>
        </Reveal>

        <div className="mt-12 grid items-start gap-5 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <Reveal key={faq.title + index} delay={(index % 2) * 0.08}>
              <FAQItem
                title={faq.title}
                body={faq.body}
                open={openIndex === index}
                onToggle={() =>
                  setOpenIndex((current) => (current === index ? -1 : index))
                }
                highlighted={index === 3}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
