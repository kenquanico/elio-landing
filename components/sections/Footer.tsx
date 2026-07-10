import Image from "next/image";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "#home" },
      { label: "About Elio", href: "#about" },
      { label: "Features", href: "#features" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Health Vault", href: "#features" },
      { label: "Medications", href: "#features" },
      { label: "Insurance", href: "#features" },
      { label: "Elio Assistant", href: "#features" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Use", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

export default function Footer() {
  return (
      <footer className="bg-[#f5f5f7] pb-8 pt-20">
        <div className="page-shell">
          <div className="rounded-[36px] bg-white p-7 sm:p-10 lg:p-12">
            <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
              <div className="max-w-[360px]">
                <a
                    href="#home"
                    aria-label="Elio home"
                    className="inline-flex items-center gap-3"
                >
                <span className="grid h-14 w-14 place-items-center rounded-[18px] bg-white">
                  <Image
                      src="/elio-land.svg"
                      alt="Elio"
                      width={46}
                      height={46}
                      className="h-11 w-11 object-contain"
                  />
                </span>

                  <span className="font-display text-xl font-bold tracking-[-0.03em] text-[#062541]">
                  Elio
                </span>
                </a>

                <p className="mt-6 text-sm leading-7 text-[#6E6E73]">
                  A private, offline-first health companion for medications,
                  records, insurance details, and everyday health organization.
                </p>

                <a
                    href="mailto:support@eliocare.tech"
                    className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-[#062541] transition hover:text-[#007AFF]"
                >
                  <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-4 w-4 fill-none stroke-current"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="3" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                  support@eliocare.tech
                </a>
              </div>

              {columns.map((column) => (
                  <div key={column.title}>
                    <h3 className="font-display text-base font-bold text-[#062541]">
                      {column.title}
                    </h3>

                    <ul className="mt-5 space-y-3.5">
                      {column.links.map((link) => (
                          <li key={link.label}>
                            <a
                                href={link.href}
                                className="text-sm text-[#6E6E73] transition hover:text-[#062541]"
                            >
                              {link.label}
                            </a>
                          </li>
                      ))}
                    </ul>
                  </div>
              ))}
            </div>

            <div className="mt-12 border-t border-black/[0.06] pt-8">
              <div className="flex flex-col gap-4 text-sm text-[#8E8E93] sm:flex-row sm:items-center sm:justify-between">
                <p>Copyright 2026 Elio. All rights reserved.</p>

                <p>Personal health organization made simpler.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
}