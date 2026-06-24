type SparkleProps = {
  className?: string;
};

export default function Sparkle({ className = "" }: SparkleProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 48 48"
      fill="none"
    >
      <path
        d="M24 1c.8 15.5 7.5 22.2 23 23-15.5.8-22.2 7.5-23 23-.8-15.5-7.5-22.2-23-23C16.5 23.2 23.2 16.5 24 1Z"
        fill="currentColor"
      />
    </svg>
  );
}
