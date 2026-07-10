import Image from "next/image";
import PhoneArtwork from "@/components/ui/PhoneArtwork";
import Reveal from "@/components/ui/Reveal";

const offlineCopy =
    "Elio follows an offline-first approach, helping you review your saved medications, insurance information, and personal health records even when your internet connection is limited.";

const personalCopy =
    "Organize your profile, records, documents, and reminders around your own health needs. Elio keeps important information clear, accessible, and easier to manage.";

export default function WhyChoose() {
  return (
      <section
          id="about"
          className="bg-white py-20 sm:py-28"
      >
        <div className="page-shell">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="eyebrow text-[#007AFF]">Advantages</p>

              <h2 className="section-heading uppercase text-[#062541]">
                Why Choose Elio?
              </h2>

              <div className="mt-10">
                <h3 className="flex items-center gap-4 font-display text-2xl font-bold text-[#062541]">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#E8F1F6]">
                  <Image
                      src="/assets/bell-icon.png"
                      alt=""
                      width={48}
                      height={48}
                      aria-hidden="true"
                      className="h-10 w-10 object-contain"
                  />
                </span>
                  Smart Health Reminders
                </h3>

                <p className="body-copy mt-5 max-w-[570px] text-[#6E6E73]">
                  {offlineCopy}
                </p>
              </div>
            </Reveal>

            <Reveal
                delay={0.1}
                className="mx-auto w-full max-w-[620px]"
            >
              <PhoneArtwork
                  src="/assets/clever-notifications.svg"
                  alt="Elio mobile app showing a medication reminder"
                  width={1475}
                  height={1521}
              />
            </Reveal>
          </div>

          <div className="mt-20 grid items-center gap-12 lg:mt-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className="order-2 mx-auto w-full max-w-[620px] lg:order-1">
              <PhoneArtwork
                  src="/assets/fully-customizable.svg"
                  alt="Elio customizable personal health profile"
                  width={1439}
                  height={1529}
              />
            </Reveal>

            <Reveal
                delay={0.1}
                className="order-1 lg:order-2"
            >
              <h3 className="flex items-center gap-4 font-display text-2xl font-bold text-[#062541]">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#E8F1F6]">
                <Image
                    src="/assets/customize-icon.png"
                    alt=""
                    width={48}
                    height={48}
                    aria-hidden="true"
                    className="h-10 w-10 object-contain"
                />
              </span>
                Built Around You
              </h3>

              <p className="body-copy mt-5 max-w-[570px] text-[#6E6E73]">
                {personalCopy}
              </p>
            </Reveal>
          </div>
        </div>
      </section>
  );
}