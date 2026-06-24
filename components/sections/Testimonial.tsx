import Image from "next/image";
import PhoneArtwork from "@/components/ui/PhoneArtwork";
import Reveal from "@/components/ui/Reveal";

export default function Testimonial() {
  return (
    <section id="testimonials" className="py-20 sm:py-28">
      <div className="page-shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-brand-black">Testimonial</p>
          <h2 className="section-heading uppercase">
            What Our Users Say About Us?
          </h2>
        </Reveal>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="mx-auto w-full max-w-[620px]">
            <PhoneArtwork
              src="/assets/testimonial-collage.png"
              alt="Uifry customers arranged around a highlighted portrait"
              width={1467}
              height={1344}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="max-w-lg font-display text-2xl font-bold leading-tight sm:text-3xl">
              The Best Financial Accounting App Ever!
            </h3>
            <blockquote className="body-copy mt-6 max-w-[570px]">
              “Arcu at dictum sapien, mollis. Vulputate sit id accumsan,
              ultricies. In ultrices malesuada elit mauris etiam odio. Duis
              tristique lacus, et blandit viverra nisl velit. Sed mattis
              rhoncus, diam suspendisse sit nunc, gravida eu.”
            </blockquote>
            <Image
              src="/assets/testimonial-people.png"
              alt="More Uifry reviewers"
              width={192}
              height={40}
              className="mt-7 h-10 w-auto"
            />
            <p className="mt-5 font-display text-lg font-bold">Nick Jonas</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
