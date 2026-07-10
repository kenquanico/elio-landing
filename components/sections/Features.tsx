import PhoneArtwork from "@/components/ui/PhoneArtwork";
import FeatureCard from "@/components/ui/FeatureCard";
import Reveal from "@/components/ui/Reveal";

const features = [
  {
    icon: "/assets/bullet-star.png",
    title: "Medication Management",
    text: "Save your medications, review upcoming doses, and keep your daily health routine easier to follow.",
  },
  {
    icon: "/assets/bullet-star.png",
    title: "Private Health Vault",
    text: "Store prescriptions, medical records, laboratory results, and important documents in one organized place.",
  },
  {
    icon: "/assets/bullet-star.png",
    title: "Insurance Records",
    text: "Keep PhilHealth and private insurance information accessible whenever you need to review your coverage.",
  },
];

export default function Features() {
  return (
      <section
          id="features"
          className="bg-[#F5F5F7] py-20 sm:py-28"
      >
        <div className="page-shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-[620px]">
            <PhoneArtwork
                src="/assets/features-phone.svg"
                alt="Elio mobile app health management screen"
                width={1449}
                height={1521}
            />
          </Reveal>

          <Reveal
              delay={0.1}
              className="relative"
          >
            <p className="eyebrow text-[#007AFF]">Features</p>

            <h2 className="section-heading uppercase text-[#062541]">
              Everything Important, Together
            </h2>

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