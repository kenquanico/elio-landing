import Image from "next/image";

type PhoneArtworkProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export default function PhoneArtwork({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: PhoneArtworkProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes="(max-width: 768px) 90vw, 50vw"
      className={`h-auto w-full object-contain ${className}`}
    />
  );
}
