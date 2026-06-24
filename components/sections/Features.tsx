import PhoneArtwork from "@/components/ui/PhoneArtwork";
import FeatureCard from "@/components/ui/FeatureCard";
import Reveal from "@/components/ui/Reveal";

const features = [
  {
    icon: "/assets/bullet-star.png",
    title: "Budgeting Intervals",
    text: "Cum et convallis risus placerat aliquam, nunc. Scelerisque aliquet faucibus tincidunt eu adipiscing sociis arcu lorem porttitor.",
  },
  {
    icon: "/assets/bullet-star.png",
    title: "Budgeting Intervals",
    text: "Cum et convallis risus placerat aliquam, nunc. Scelerisque aliquet faucibus tincidunt eu adipiscing sociis arcu lorem porttitor.",
  },
  {
    icon: "/assets/bullet-star.png",
    title: "Budgeting Intervals",
    text: "Cum et convallis risus placerat aliquam, nunc. Scelerisque aliquet faucibus tincidunt eu adipiscing sociis arcu lorem porttitor.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="page-shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-[620px]">
          <PhoneArtwork
            src="/assets/features-phone.png"
            alt="Uifry premium budgeting app screen"
            width={1449}
            height={1521}
          />
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <div className="red-glow absolute -right-24 -top-12 -z-10 h-52 w-80 opacity-45" />
          <p className="eyebrow">Features</p>
          <h2 className="section-heading uppercase">Uifry Premium</h2>
          <div className="mt-9 grid gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={`${feature.title}-${index}`}
                icon={feature.icon}
                title={feature.title}
              >
                {feature.text}
              </FeatureCard>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
