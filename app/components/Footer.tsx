import Link from "next/link";
import { OUR_SOCIAL_ITEMS } from "../data/ourSocial";
import { NAVBAR_LOGO } from "../data/navbar";

const NAV_LINKS = [
  { label: "Collections", href: "/collections" },
  { label: "Nakshi", href: "/collections/nakshi" },
  { label: "Polki", href: "/collections/polki" },
  { label: "Kundan", href: "/collections/kundan" },
  { label: "Temple", href: "/collections/temple" },
  { label: "Bridal", href: "/collections/bridal" },
];

const INFO_LINKS = [
  { label: "About Goyaz", href: "#" },
  { label: "Karigar Stories", href: "#" },
  { label: "Silver Guide", href: "#" },
  { label: "Care & Maintenance", href: "#" },
  { label: "Contact Us", href: "#" },
];

export function Footer() {
  return (
    <footer
      className="font-sans bg-(--color-dark) text-white w-full"
      data-mfe="footer"
    >
      {/* ── Main footer body ── */}
      <div className="layout-container py-[40px] lg:py-[60px]">
        <div className="layout-inner">

          {/* Mobile: stacked layout — Desktop: 4-column row */}
          <div className="flex flex-col gap-[40px] lg:flex-row lg:items-start lg:justify-between lg:gap-[40px]">

            {/* Brand column */}
            <div className="flex flex-col gap-[20px] lg:max-w-[280px]">
              <div className="h-[48px] w-[72px] lg:h-[56px] lg:w-[84px] relative">
                <img
                  src={NAVBAR_LOGO}
                  alt="Goyaz"
                  className="w-full h-full object-contain brightness-0 invert"
                  loading="lazy" decoding="async"
                />
              </div>
              <p className="text-[13px] text-white/60 leading-[1.7] max-w-[320px] lg:max-w-none">
                India&apos;s Largest Premium Silver Destination. Handcrafted 92.5 sterling silver jewellery by master karigars.
              </p>
              {/* Social icons */}
              <div className="flex gap-[16px] items-center flex-wrap">
                {OUR_SOCIAL_ITEMS.map(({ src, alt }) => (
                  <a
                    key={alt}
                    href="#"
                    aria-label={alt}
                    className="w-[22px] h-[22px] lg:w-[20px] lg:h-[20px] relative opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <img src={src} alt={alt} className="w-full h-full brightness-0 invert" loading="lazy" decoding="async" />
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile: 2-column grid for Collections + Info */}
            <div className="grid grid-cols-2 gap-[32px] lg:contents">

              {/* Collections column */}
              <div className="flex flex-col gap-[16px]">
                <p className="text-[11px] lg:text-[12px] uppercase tracking-[2px] text-white/40">Collections</p>
                <ul className="flex flex-col gap-[10px] lg:gap-[12px]">
                  {NAV_LINKS.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-[13px] lg:text-[14px] text-white/75 hover:text-white transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Info column */}
              <div className="flex flex-col gap-[16px]">
                <p className="text-[11px] lg:text-[12px] uppercase tracking-[2px] text-white/40">Information</p>
                <ul className="flex flex-col gap-[10px] lg:gap-[12px]">
                  {INFO_LINKS.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-[13px] lg:text-[14px] text-white/75 hover:text-white transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Newsletter column */}
            <div className="flex flex-col gap-[16px] lg:max-w-[300px]">
              <p className="text-[11px] lg:text-[12px] uppercase tracking-[2px] text-white/40">Inner Circle</p>
              <p className="text-[13px] text-white/60 leading-[1.7]">
                Get early access to new collections and exclusive bridal offers.
              </p>
              <div className="flex border border-white/30">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-transparent px-[14px] py-[12px] text-[13px] text-white placeholder:text-white/30 outline-none min-w-0"
                  suppressHydrationWarning
                />
                <button
                  type="button"
                  className="px-[18px] py-[12px] bg-white text-(--color-dark) text-[12px] uppercase tracking-[1px] hover:bg-white/90 transition-colors shrink-0"
                  suppressHydrationWarning
                >
                  Join
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="layout-container py-[16px] lg:py-[20px]">
          <div className="layout-inner flex flex-col gap-[6px] items-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <p className="text-[11px] lg:text-[12px] text-white/40">
              © {new Date().getFullYear()} Goyaz. All rights reserved.
            </p>
            <p className="text-[11px] lg:text-[12px] text-white/40">
              92.5 Sterling Silver · Handcrafted in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
