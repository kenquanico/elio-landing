import Image from "next/image";

type FeatureCardProps = {
  icon: string;
  title: string;
  children: React.ReactNode;
};

export default function FeatureCard({
  icon,
  title,
  children,
}: FeatureCardProps) {
  return (
    <article className="border-b border-black/10 pb-6 last:border-0 last:pb-0">
      <h3 className="flex items-center gap-3 font-display text-lg font-bold">
        <Image src={icon} alt="" width={24} height={24} aria-hidden="true" />
        {title}
      </h3>
      <p className="body-copy mt-3">{children}</p>
    </article>
  );
}
