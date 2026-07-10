import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export default function CTA() {
  return (
      <section
          id="download"
          className="bg-white py-20 sm:py-28"
      >
        <div className="page-shell">
          <Reveal className="relative min-h-[480px] overflow-hidden rounded-[32px] bg-[#062541] px-7 py-14 text-white sm:px-12 lg:min-h-[510px] lg:px-20">
            <Image
                src="/assets/footer-banner.svg"
                alt=""
                fill
                sizes="(max-width: 1280px) 100vw, 1240px"
                className="object-cover object-center opacity-35"
                aria-hidden="true"
            />

            <div className="absolute inset-0 bg-[#062541]/85" />

            <div className="relative z-10 max-w-[560px] pt-8 lg:pt-24">
              <h2 className="font-display text-4xl font-extrabold leading-tight tracking-[-0.04em] sm:text-5xl">
                Your Health Information, Always Close
              </h2>

              <p className="mt-5 max-w-lg leading-7 text-white/70">
                Keep medications, records, insurance details, and important
                health information organized through one private mobile
                companion.
              </p>

              <a
                  href="#home"
                  className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-7 py-4 font-semibold text-[#062541] transition hover:-translate-y-0.5 hover:bg-[#007AFF] hover:text-white"
              >
                Download Elio

                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.1v-.01ZM12.03 7.25C11.88 5.02 13.69 3.18 15.77 3c.29 2.58-2.34 4.5-3.74 4.25Z" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
  );
}