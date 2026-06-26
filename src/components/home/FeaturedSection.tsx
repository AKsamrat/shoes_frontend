import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaStar, FaHeart, FaShoppingCart, FaFire } from "react-icons/fa";
import RevealDiv from "./RevealDiv";
import { FEATURED } from "./homeData";

const FeaturedSection = () => {
  const [wishlisted, setWishlisted] = useState<number[]>([]);

  const toggleWish = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setWishlisted(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-[#0a0a0f] relative overflow-hidden">
      {/* ambient blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full opacity-[0.04] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-600 rounded-full opacity-[0.04] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* heading */}
        <RevealDiv direction="up" className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <p className="text-orange-400 font-semibold tracking-widest uppercase text-sm mb-3 flex items-center gap-2">
              <FaFire size={12} /> Hot Right Now
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white">Featured Drops</h2>
          </div>
          <Link
            to="/shop"
            className="group flex items-center gap-2 text-orange-400 font-semibold hover:gap-4 transition-all text-sm"
          >
            View All Collection <FaArrowRight size={12} />
          </Link>
        </RevealDiv>

        {/* grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED.map((shoe, i) => (
            <RevealDiv key={shoe.id} direction="up" delay={`delay-${(i % 4 + 1) * 100}`}>
              <Link
                to={`/product/${shoe.slug}`}
                className="group relative flex flex-col rounded-3xl overflow-hidden cursor-pointer block"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                  transition: "transform 0.4s cubic-bezier(.16,1,.3,1), box-shadow 0.4s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-10px) scale(1.02)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(249,115,22,0.25)`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
                }}
              >
                {/* ── image area ── */}
                <div className={`relative bg-gradient-to-br ${shoe.color} h-56 overflow-hidden`}>
                  {/* glow bloom on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ background: `radial-gradient(ellipse at center, ${shoe.glow}, transparent 70%)` }}
                  />

                  <img
                    src={shoe.image}
                    alt={shoe.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* top badges row */}
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                    <span
                      className="text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full text-white"
                      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}
                    >
                      {shoe.tag}
                    </span>
                    {/* wishlist */}
                    <button
                      onClick={e => toggleWish(shoe.id, e)}
                      aria-label="Wishlist"
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}
                    >
                      <FaHeart
                        size={13}
                        className={wishlisted.includes(shoe.id) ? "text-red-500" : "text-white/50"}
                      />
                    </button>
                  </div>

                  {/* category chip bottom-left */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full text-white/70"
                      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}
                    >
                      {shoe.category}
                    </span>
                  </div>

                  {/* quick-add slide up */}
                  <div
                    className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)" }}
                  >
                    <FaShoppingCart size={12} className="text-white" />
                    <span className="text-white text-xs font-bold tracking-wide">Quick Add to Cart</span>
                  </div>
                </div>

                {/* ── info area ── */}
                <div className="p-5 flex flex-col gap-3">

                  {/* name + emoji */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-black text-base text-white leading-tight">{shoe.name}</h3>
                    <span className="text-xl flex-shrink-0">{shoe.badge}</span>
                  </div>

                  {/* rating */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {Array(5).fill(0).map((_, j) => (
                        <FaStar
                          key={j}
                          size={10}
                          className={j < Math.floor(shoe.rating) ? "text-yellow-400" : "text-white/15"}
                        />
                      ))}
                    </div>
                    <span className="text-white/60 text-xs font-semibold">{shoe.rating}</span>
                    <span className="text-white/25 text-xs">({shoe.reviews.toLocaleString()})</span>
                  </div>

                  {/* sizes preview */}
                  <div className="flex flex-wrap gap-1">
                    {shoe.sizes.slice(0, 4).map(s => (
                      <span
                        key={s}
                        className="text-[9px] font-semibold px-1.5 py-0.5 rounded border text-white/35 border-white/10"
                      >
                        {s}
                      </span>
                    ))}
                    {shoe.sizes.length > 4 && (
                      <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded border text-white/25 border-white/10">
                        +{shoe.sizes.length - 4}
                      </span>
                    )}
                  </div>

                  {/* divider */}
                  <div className="h-px bg-white/5" />

                  {/* price + CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-end gap-2">
                      <span className="text-xl font-black text-orange-400">
                        {shoe.price}
                      </span>
                      <span className="text-white/25 line-through text-xs pb-0.5">{shoe.oldPrice}</span>
                    </div>
                    <div
                      className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full text-white transition-all duration-200 group-hover:scale-105"
                      style={{ background: "#f97316", boxShadow: "0 4px 12px rgba(249,115,22,0.35)" }}
                    >
                      Buy <FaArrowRight size={9} />
                    </div>
                  </div>
                </div>

                {/* bottom shimmer line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(90deg, transparent, #f97316, transparent)" }}
                />
              </Link>
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
