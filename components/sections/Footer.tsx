import Image from "next/image";

const columns = [
  {
    title: "Links",
    links: ["Home", "About Us", "Bookings", "Blog"],
  },
  {
    title: "Legal",
    links: ["Terms Of Use", "Privacy Policy", "Cookie Policy"],
  },
  {
    title: "Product",
    links: ["Take Tour", "Live Chat", "Reviews"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black pb-10 pt-20 text-white">
      <div className="page-shell">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.7fr_0.9fr_0.7fr_1.5fr]">
          <div>
            <div className="inline-flex rounded-xl bg-white px-3 py-2">
              <Image src="/uifry.svg" alt="Uifry" width={117} height={35} />
            </div>
            <a
              href="mailto:help@frybix.com"
              className="mt-6 flex items-center gap-3 text-sm text-white/70 hover:text-white"
            >
              <span aria-hidden="true">✉</span> help@frybix.com
            </a>
            <a
              href="tel:+123445667889"
              className="mt-3 flex items-center gap-3 text-sm text-white/70 hover:text-white"
            >
              <span aria-hidden="true">☎</span> +1 234 456 678 89
            </a>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-display text-xl font-bold">{column.title}</h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#home"
                      className="text-sm text-white/60 transition hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-display text-xl font-bold">Newsletter</h3>
            <p className="mt-5 text-sm text-white/60">
              Stay up to date with Uifry.
            </p>
            <form className="mt-5 flex rounded-lg bg-white p-1.5">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-black outline-none"
              />
              <button
                type="submit"
                className="rounded-md bg-brand-red px-4 py-3 text-sm font-semibold text-white transition hover:bg-black"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-white/50">
          Copyright 2026 Uifry. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
