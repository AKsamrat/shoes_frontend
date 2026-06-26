import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBoxOpen } from "react-icons/fa";
import RevealDiv from "./RevealDiv";
import { BRANDS } from "./homeData";

/* ── single accent palette ── */
const A = {
  border:      "rgba(249,115,22,0.18)",
  borderHover: "rgba(249,115,22,0.45)",
  glow:        "rgba(249,115,22,0.12)",
  glowCorner:  "#f97316",
  shimmer:     "rgba(249,115,22,0.5)",
  text:        "#f97316",
  chip:        "rgba(249,115,22,0.12)",
  chipBorder:  "rgba(249,115,22,0.25)",
};

const BrandsSection = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative py-28 px-6 md:px-12 overflow-hidden bg-[#07070d]">

      {/* single ambient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-orange-500 rounded-full opacity-[0.04] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* heading */}
        <RevealDiv direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-orange-400 font-semibold tracking-widest uppercase text-sm mb-3 flex items-center gap-2">
              <span className="inline-block w-4 h-px bg-orange-400" />
              Official Partners
              <span className="inline-block w-4 h-px bg-orange-400" />
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Top Brands We <span className="text-orange-400">Carry</span>
            </h2>
            <p className="text-white/30 mt-3 text-sm max-w-sm">
              100% authentic products, directly sourced from the world's most iconic footwear brands.
            </p>
          </div>
          <Link
            to="/shop"
            className="group flex items-center gap-2 text-orange-400 font-semibold text-sm hover:gap-4 transition-all flex-shrink-0"
          >
            Explore All Brands <FaArrowRight size={12} />
          </Link>
        </RevealDiv>

        {/* cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {BRANDS.map((brand, i) => {
            const isHov = hovered === brand.name;
            return (
              <RevealDiv key={brand.name} direction="scale" delay={`delay-${(i % 4 + 1) * 100}`}>
                <Link
                  to="/shop"
                  className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
                  onMouseEnter={() => setHovered(brand.name)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: "#0f1014",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${isHov ? A.borderHover : A.border}`,
                    boxShadow: isHov
                      ? `0 24px 56px rgba(0,0,0,0.55), 0 0 0 1px ${A.borderHover}, inset 0 1px 0 rgba(255,255,255,0.06)`
                      : `0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)`,
                    transform: isHov ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
                    transition: "all 0.35s cubic-bezier(.16,1,.3,1)",
                    minHeight: 200,
                  }}
                >
                  {/* top shimmer */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${A.shimmer}, transparent)`,
                      opacity: isHov ? 1 : 0.3,
                    }}
                  />

                  {/* corner glow */}
                  <div
                    className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl pointer-events-none transition-opacity duration-400"
                    style={{ background: A.glowCorner, opacity: isHov ? 0.15 : 0.05 }}
                  />

                  <div className="relative z-10 p-6 flex flex-col h-full">

                    {/* logo */}
                    <div className="w-full h-14 mb-5 flex items-center justify-start transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={brand.logoUrl}
                        alt={`${brand.name} logo`}
                        className="h-9 max-w-[130px] object-contain"
                        style={{
                          filter: "brightness(0) invert(1)",
                          opacity: isHov ? 1 : 0.6,
                          transition: "opacity 0.3s ease",
                        }}
                        loading="lazy"
                        onError={e => {
                          (e.target as HTMLImageElement).style.display = "none";
                          const fb = (e.target as HTMLImageElement).nextElementSibling as HTMLElement | null;
                          if (fb) fb.style.display = "flex";
                        }}
                      />
                      {/* fallback */}
                      <div className="hidden text-xl font-black items-center" style={{ color: A.text }}>
                        {brand.name}
                      </div>
                    </div>

                    {/* tagline + count chip */}
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <p className="text-[11px] leading-snug max-w-[130px]"
                        style={{ color: isHov ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.22)" }}>
                        {brand.tag}
                      </p>
                      <div
                        className="flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-black tracking-wider uppercase flex-shrink-0"
                        style={{ background: A.chip, border: `1px solid ${A.chipBorder}`, color: A.text }}
                      >
                        <FaBoxOpen size={7} />
                        {brand.products}+
                      </div>
                    </div>

                    {/* divider + shop arrow */}
                    <div className="flex items-center justify-between mt-auto pt-4"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <span className="text-[10px] font-semibold tracking-wide transition-colors duration-300"
                        style={{ color: isHov ? A.text : "rgba(255,255,255,0.2)" }}>
                        {brand.products} products
                      </span>
                      <div
                        className="flex items-center gap-1 text-[10px] font-black tracking-wide uppercase transition-all duration-300"
                        style={{
                          color: A.text,
                          opacity: isHov ? 1 : 0,
                          transform: isHov ? "translateX(0)" : "translateX(-8px)",
                        }}
                      >
                        Shop <FaArrowRight size={8} />
                      </div>
                    </div>
                  </div>

                  {/* bottom accent bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] transition-transform duration-300"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${A.text}, transparent)`,
                      transform: isHov ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "center",
                    }}
                  />
                </Link>
              </RevealDiv>
            );
          })}
        </div>

        {/* stats strip */}
        <RevealDiv direction="up" delay="delay-300" className="mt-16">
          <div className="flex flex-wrap items-center justify-center gap-px rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${A.border}` }}>
            {[
              { value: "8+",   label: "Global Brands"       },
              { value: "600+", label: "Products Available"  },
              { value: "100%", label: "Authentic Pairs"     },
              { value: "Free", label: "Returns & Exchanges" },
            ].map(({ value, label }, i) => (
              <div key={label}
                className="flex-1 min-w-[140px] flex flex-col items-center justify-center py-6 px-4 text-center"
                style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.03)" }}>
                <p className="text-2xl font-black text-orange-400 mb-0.5">{value}</p>
                <p className="text-white/30 text-xs tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </RevealDiv>
      </div>
    </section>
  );
};

export default BrandsSection;
