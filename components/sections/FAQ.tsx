"use client";

import { useState } from "react";
import FAQItem from "@/components/ui/FAQItem";
import Reveal from "@/components/ui/Reveal";

const faqs = [
  {
    title: "Does Elio Work Without Internet?",
    body: "Elio follows an offline-first approach. Your saved medications, records, insurance information, and profile details remain accessible on your device.",
  },
  {
    title: "What Health Information Can I Store?",
    body: "You can organize medications, prescriptions, laboratory results, insurance records, health documents, allergies, conditions, and emergency details.",
  },
  {
    title: "Can I Save My PhilHealth Information?",
    body: "Yes. Elio supports PhilHealth details alongside private health insurance, life insurance, and other coverage records.",
  },
  {
    title: "Does Elio Replace My Doctor?",
    body: "No. Elio helps organize personal health information and routines. It does not provide a replacement for professional medical advice, diagnosis, or treatment.",
  },
  {
    title: "How Does Elio Protect My Information?",
    body: "Elio is designed around private access, clear controls, and local storage for supported offline information. You remain in control of your saved records.",
  },
  {
    title: "Can Elio Remind Me About Medications?",
    body: "Yes. You can save medication schedules and review upcoming doses so important routines remain easier to follow.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
      <section
          id="faq"
          className="bg-[#F5F5F7] py-20 sm:py-28"
      >
        <div className="page-shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-[#007AFF]">FAQ</p>

            <h2 className="section-heading uppercase text-[#062541]">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <div className="mt-12 grid items-start gap-5 md:grid-cols-2">
            {faqs.map((faq, index) => (
                <Reveal
                    key={`${faq.title}-${index}`}
                    delay={(index % 2) * 0.08}
                >
                  <FAQItem
                      title={faq.title}
                      body={faq.body}
                      open={openIndex === index}
                      onToggle={() =>
                          setOpenIndex((current) =>
                              current === index ? -1 : index,
                          )
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