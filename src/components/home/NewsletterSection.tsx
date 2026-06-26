import RevealDiv from "./RevealDiv";
import { FaBell, FaArrowRight } from "react-icons/fa";

const NewsletterSection = () => (
  <section className="relative py-28 px-6 md:px-12 overflow-hidden bg-[#07070d]">

    {/* ── layered dark bg with single orange focal glow ── */}
    <div className="absolute inset-0 pointer-events-none">
      {/* deep radial center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(ellipse, #f97316 0%, transparent 70%)" }}
      />
      {/* subtle top-left corner light */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-10 bg-orange-500" />
      {/* subtle bottom-right */}
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-10 bg-orange-600" />
    </div>

    {/* ── noise grain ── */}
    <div
      className="absolute inset-0 opacity-[0.025] pointer-events-none"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />

    {/* ── top + bottom hairline borders ── */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

    <RevealDiv direction="up" className="relative z-10 max-w-2xl mx-auto text-center">

      {/* icon badge */}
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-7 mx-auto"
        style={{
          background: "rgba(249,115,22,0.1)",
          border: "1px solid rgba(249,115,22,0.25)",
          boxShadow: "0 0 32px rgba(249,115,22,0.15)",
        }}
      >
        <FaBell size={22} className="text-orange-400" />
      </div>

      {/* label */}
      <p className="text-orange-400 font-semibold tracking-widest uppercase text-xs mb-4">
        Stay in the Loop
      </p>

      {/* headline */}
      <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
        Get Drops Before <br className="hidden sm:block" />
        <span className="text-orange-400">Anyone Else</span>
      </h2>

      {/* sub */}
      <p className="text-white/40 text-base mb-10 max-w-sm mx-auto leading-relaxed">
        Join 50,000+ sneakerheads. No spam — just exclusive drops and early access.
      </p>

      {/* form */}
      <form
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="your@email.com"
          className="flex-1 px-5 py-3.5 rounded-full text-white text-sm placeholder-white/25 outline-none transition-all"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          onFocus={e =>
            ((e.target as HTMLInputElement).style.borderColor = "rgba(249,115,22,0.5)")
          }
          onBlur={e =>
            ((e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)")
          }
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-full text-white text-sm whitespace-nowrap transition-all duration-200 hover:scale-105 hover:brightness-110"
          style={{
            background: "#f97316",
            boxShadow: "0 8px 28px rgba(249,115,22,0.35)",
          }}
        >
          Subscribe <FaArrowRight size={11} />
        </button>
      </form>

      {/* trust note */}
      <p className="text-white/20 text-xs tracking-wide">
        🔒 No spam, ever. Unsubscribe anytime.
      </p>

    </RevealDiv>
  </section>
);

export default NewsletterSection;
