import { Link } from "react-router-dom";
import {
  FaRunning, FaBasketballBall, FaStar,
  FaMountain, FaBriefcase, FaChild, FaArrowRight,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import RevealDiv from "./RevealDiv";
import { CATEGORIES } from "./homeData";

/* ── single accent palette ── */
const A = {
  border:     "rgba(249,115,22,0.18)",   // orange-500 / 18 %
  borderHover:"rgba(249,115,22,0.45)",
  glow:       "rgba(249,115,22,0.12)",
  glowHover:  "rgba(249,115,22,0.28)",
  icon:       "#f97316",                 // orange-500
  text:       "#f97316",
  shimmer:    "rgba(249,115,22,0.5)",
};

const ICON_MAP: Record<string, IconType> = {
  running:    FaRunning,
  basketball: FaBasketballBall,
  lifestyle:  FaStar,
  trail:      FaMountain,
  formal:     FaBriefcase,
  kids:       FaChild,
};

const CategorySection = () => (
  <section className="relative py-24 px-6 md:px-12 overflow-hidden bg-[#0a0a0f]">

    {/* single-color ambient blob */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-orange-500 rounded-full opacity-[0.04] blur-3xl pointer-events-none" />

    <div className="max-w-7xl mx-auto relative z-10">

      <RevealDiv direction="up" className="text-center mb-16">
        <p className="text-orange-400 font-semibold tracking-widest uppercase text-sm mb-3">
          Browse By Style
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-white">Shop by Category</h2>
        <p className="text-white/30 mt-3 text-sm max-w-md mx-auto">
          Find your perfect pair — from performance running to everyday lifestyle
        </p>
      </RevealDiv>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {CATEGORIES.map((cat, i) => {
          const Icon = ICON_MAP[cat.icon] ?? FaStar;
          return (
            <RevealDiv key={cat.label} direction="scale" delay={`delay-${(i % 4 + 1) * 100}`}>
              <Link
                to="/shop"
                className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl overflow-hidden cursor-pointer py-8 px-4"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: `1px solid ${A.border}`,
                  boxShadow: `0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`,
                  transition: "transform 0.35s cubic-bezier(.16,1,.3,1), box-shadow 0.35s ease, border-color 0.3s ease",
                  minHeight: 160,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-7px) scale(1.03)";
                  el.style.borderColor = A.borderHover;
                  el.style.boxShadow = `0 20px 48px rgba(0,0,0,0.45), 0 0 0 1px ${A.borderHover}, inset 0 1px 0 rgba(255,255,255,0.07)`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0) scale(1)";
                  el.style.borderColor = A.border;
                  el.style.boxShadow = `0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`;
                }}
              >
                {/* top shimmer line */}
                <div className="absolute top-0 left-0 right-0 h-px opacity-40"
                  style={{ background: `linear-gradient(90deg, transparent, ${A.shimmer}, transparent)` }} />

                {/* hover glow fill */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at center, ${A.glowHover} 0%, transparent 70%)` }} />

                {/* icon circle */}
                <div
                  className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-400 group-hover:scale-110 group-hover:-translate-y-1"
                  style={{
                    background: A.glow,
                    border: `1px solid ${A.border}`,
                  }}
                >
                  <Icon size={26} style={{ color: A.icon }} />
                </div>

                {/* label */}
                <span className="relative z-10 text-white font-bold text-xs tracking-widest uppercase text-center leading-tight">
                  {cat.label}
                </span>

                {/* count — fades in on hover */}
                <span
                  className="relative z-10 text-[9px] font-semibold tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0"
                  style={{ color: A.text }}
                >
                  {cat.count}
                </span>

                {/* arrow circle */}
                <div
                  className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                  style={{ background: "rgba(249,115,22,0.2)", border: `1px solid ${A.border}` }}
                >
                  <FaArrowRight size={8} style={{ color: A.icon }} />
                </div>

                {/* bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 rounded-b-2xl opacity-15"
                  style={{ background: `linear-gradient(to top, ${A.glow}, transparent)` }} />
              </Link>
            </RevealDiv>
          );
        })}
      </div>
    </div>
  </section>
);

export default CategorySection;
