import Image from "next/image";
import PhoneArtwork from "@/components/ui/PhoneArtwork";
import Reveal from "@/components/ui/Reveal";

const copy =
  "Arcu at dictum sapien, mollis. Vulputate sit id accumsan, ultricies. In ultrices malesuada elit mauris etiam odio. Duis tristique lacus, et blandit viverra nisl velit. Sed mattis rhoncus, diam suspendisse sit nunc, gravida eu.";

export default function WhyChoose() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="page-shell">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">Advantages</p>
            <h2 className="section-heading uppercase">Why Choose Uifry?</h2>
            <div className="mt-10">
              <h3 className="flex items-center gap-4 font-display text-2xl font-bold">
                <Image
                  src="/assets/bell-icon.png"
                  alt=""
                  width={48}
                  height={48}
                  aria-hidden="true"
                />
                Clever Notifications
              </h3>
              <p className="body-copy mt-5 max-w-[570px]">{copy}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mx-auto w-full max-w-[620px]">
            <PhoneArtwork
              src="/assets/clever-notifications.png"
              alt="Uifry app with a clever notification overlay"
              width={1475}
              height={1521}
            />
          </Reveal>
        </div>

        <div className="mt-20 grid items-center gap-12 lg:mt-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 mx-auto w-full max-w-[620px] lg:order-1">
            <PhoneArtwork
              src="/assets/fully-customizable.png"
              alt="Customizable Uifry Visa card screen"
              width={1439}
              height={1529}
            />
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <h3 className="flex items-center gap-4 font-display text-2xl font-bold">
              <Image
                src="/assets/customize-icon.png"
                alt=""
                width={48}
                height={48}
                aria-hidden="true"
              />
              Fully Customizable
            </h3>
            <p className="body-copy mt-5 max-w-[570px]">{copy}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
