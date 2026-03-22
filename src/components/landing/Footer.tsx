import Link from "next/link";

const productLinks = [
  { label: "Assessment", href: "/auth/signup" },
  { label: "Pricing", href: "/pricing" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
];

const legalLinks = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund" },
];

const linkStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.45)",
};

const linkHoverClass =
  "block py-1 text-[13px] transition-colors duration-200 hover:text-white/80";

const headingStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.7)",
};

export default function Footer() {
  return (
    <>
      {/* ── Transition gradient from light into dark footer ── */}
      <div
        className="h-20 sm:h-28"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-background, #FAFAFF), #0c0a1a)",
        }}
      />

      <footer
        className="relative overflow-hidden px-5 pb-8 pt-14 sm:pt-20"
        style={{
          background:
            "linear-gradient(165deg, #0c0a1a 0%, #111029 35%, #0d0b1e 70%, #08071a 100%)",
        }}
      >
        {/* ── Grain overlay (matches hero) ── */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* ── Subtle ambient orb ── */}
        <div
          className="pointer-events-none absolute top-[-30%] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[200px]"
          style={{
            background:
              "radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* ── Top: 3-column grid ── */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
            {/* Column 1 — Brand */}
            <div>
              <h2
                className="text-2xl font-bold tracking-tight"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#fff",
                }}
              >
                Once
                <span className="relative inline-block">
                  <span style={{ color: "#6366F1" }}>.</span>
                  <span
                    className="pointer-events-none absolute bottom-[0.1em] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
                    style={{
                      background: "#6366F1",
                      filter: "blur(6px)",
                      opacity: 0.7,
                    }}
                  />
                </span>
              </h2>
              <p
                className="mt-3 max-w-[240px] text-[13px] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                The decision that changes everything. Diagnose your life, build
                your path, earn real results.
              </p>
            </div>

            {/* Column 2 — Product */}
            <div>
              <h3
                className="mb-4 text-[11px] font-semibold tracking-[0.2em] uppercase"
                style={headingStyle}
              >
                Product
              </h3>
              <nav className="flex flex-col">
                {productLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={linkHoverClass}
                    style={linkStyle}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 3 — Legal */}
            <div>
              <h3
                className="mb-4 text-[11px] font-semibold tracking-[0.2em] uppercase"
                style={headingStyle}
              >
                Legal
              </h3>
              <nav className="flex flex-col">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={linkHoverClass}
                    style={linkStyle}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Contact */}
              <h3
                className="mb-3 mt-8 text-[11px] font-semibold tracking-[0.2em] uppercase"
                style={headingStyle}
              >
                Contact
              </h3>
              <a
                href="mailto:hello@oncelife.co"
                className="text-[13px] transition-colors duration-200 hover:text-white/80"
                style={linkStyle}
              >
                hello@oncelife.co
              </a>
            </div>
          </div>

          {/* ── Divider ── */}
          <div
            className="my-10"
            style={{
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(99,102,241,0.15) 30%, rgba(99,102,241,0.15) 70%, transparent)",
            }}
          />

          {/* ── Bottom bar ── */}
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p
              className="text-[12px]"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              &copy; {new Date().getFullYear()} Once
              <span style={{ color: "#6366F1" }}>.</span> All rights reserved.
            </p>
            <p
              className="text-[11px]"
              style={{ color: "rgba(255,255,255,0.15)" }}
            >
              Built in the Philippines, for the Philippines.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
