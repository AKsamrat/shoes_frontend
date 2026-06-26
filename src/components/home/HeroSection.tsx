import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaPlay, FaFire, FaChevronRight, FaStar } from "react-icons/fa";
import { HERO_SLIDES, SLIDE_DURATION } from "./homeData";

const HeroSection = () => {
  const [activeIdx, setActiveIdx]     = useState(0);
  const [shoeKey, setShoeKey]         = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [paused, setPaused]           = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((idx: number) => {
    if (idx === activeIdx) return;
    setActiveIdx(idx);
    setShoeKey(k => k + 1);
    setProgressKey(k => k + 1);
  }, [activeIdx]);

  const next = useCallback(() => {
    goTo((activeIdx + 1) % HERO_SLIDES.length);
  }, [activeIdx, goTo]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, SLIDE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [activeIdx, paused, next]);

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const slide = HERO_SLIDES[activeIdx];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Dynamic backgrounds ── */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 bg-gradient-to-br ${s.bg}
            ${i === activeIdx ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      {/* radial glow */}
      <div
        className="absolute right-0 top-1/2 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${slide.glow} 0%, transparent 70%)`,
          transform: `translateY(calc(-50% + ${scrollY * 0.06}px))`,
        }}
      />

      {/* grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
      />

      {/* ── 3-column grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-10 grid md:grid-cols-[420px_1fr_120px] lg:grid-cols-[480px_1fr_130px] gap-6 items-center min-h-screen py-24">

        {/* ── LEFT: copy ── */}
        <div className="flex flex-col justify-center order-2 md:order-1">

          {/* tag pill */}
          <div key={`tag-${activeIdx}`} className="hero-line mb-5" style={{ animationDelay: "0s" }}>
            <span
              className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.15em] uppercase px-4 py-1.5 rounded-full border"
              style={{ color: slide.accent, borderColor: slide.accent + "55", background: slide.accent + "15" }}
            >
              <FaFire size={9} /> {slide.tag}
            </span>
          </div>

          {/* headline */}
          <h1 className="font-black leading-[0.92] mb-4" style={{ fontSize: "clamp(2.6rem, 5.5vw, 5.2rem)" }}>
            <span key={`h1a-${activeIdx}`} className="hero-line block text-white" style={{ animationDelay: "0.07s" }}>
              {slide.name.split(" ").slice(0, 2).join(" ")}
            </span>
            <span
              key={`h1b-${activeIdx}`}
              className="hero-line block"
              style={{ animationDelay: "0.14s", color: slide.accent }}
            >
              {slide.name.split(" ").slice(2).join(" ") || slide.tagline.split(" ").slice(0, 2).join(" ")}
            </span>
          </h1>

          {/* tagline */}
          <p
            key={`tl-${activeIdx}`}
            className="hero-line text-lg md:text-xl font-light text-white/55 mb-3 leading-snug"
            style={{ animationDelay: "0.2s" }}
          >
            {slide.tagline}
          </p>

          {/* specs */}
          <p
            key={`sp-${activeIdx}`}
            className="hero-line text-[11px] text-white/35 mb-8 max-w-xs leading-relaxed tracking-wide"
            style={{ animationDelay: "0.27s" }}
          >
            {slide.sub}
          </p>

          {/* price row */}
          <div
            key={`price-${activeIdx}`}
            className="hero-line flex items-end gap-3 mb-6"
            style={{ animationDelay: "0.33s" }}
          >
            <span className="text-4xl font-black leading-none" style={{ color: slide.accent }}>
              {slide.price}
            </span>
            <span className="text-base text-white/25 line-through leading-none pb-0.5">
              {slide.oldPrice}
            </span>
            <span
              className="text-[10px] font-black px-2 py-0.5 rounded-full ml-1 leading-none"
              style={{ background: slide.accent + "25", color: slide.accent }}
            >
              SAVE {Math.round((1 - parseInt(slide.price.replace("$", "")) / parseInt(slide.oldPrice.replace("$", ""))) * 100)}%
            </span>
          </div>

          {/* CTA buttons */}
          <div
            key={`cta-${activeIdx}`}
            className="hero-line flex items-center gap-3 mb-7"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              to="/shop"
              className="btn-shine group flex items-center w-36 gap-2 text-white font-bold px-5 py-2.5 rounded-full text-sm transition-all duration-300 hover:scale-105"
              style={{ background: slide.accent, boxShadow: `0 6px 24px ${slide.accent}50` }}
            >
              Buy Now
              <FaArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/shop"
              className="flex items-center w-44 mt-6 gap-2 border border-white/20 hover:border-white/50 text-white/55 hover:text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-all backdrop-blur-sm hover:bg-white/5"
            >
              <FaPlay size={9} /> See Collection
            </Link>
          </div>

          {/* meta row */}
          <div
            key={`meta-${activeIdx}`}
            className="hero-line flex items-center gap-5"
            style={{ animationDelay: "0.47s" }}
          >
            <div>
              <p className="text-[9px] text-white/25 tracking-widest uppercase mb-0.5">Size Range</p>
              <p className="text-xs text-white/60 font-semibold">{slide.size}</p>
            </div>
            <div className="w-px h-7 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <FaStar size={11} className="text-yellow-400" />
              <span className="text-xs font-bold text-white/70">4.9</span>
              <span className="text-[10px] text-white/30">(2.3k reviews)</span>
            </div>
            <div className="w-px h-7 bg-white/10" />
            <div>
              <p className="text-[9px] text-white/25 tracking-widest uppercase mb-0.5">Free Ship</p>
              <p className="text-xs text-white/60 font-semibold">Orders $50+</p>
            </div>
          </div>
        </div>

        {/* ── CENTER: shoe image ── */}
        <div
          className="relative flex items-center justify-center order-1 md:order-2"
          style={{ transform: `translateY(${scrollY * 0.07}px)` }}
        >
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-30 transition-all duration-700 scale-90"
            style={{ background: `radial-gradient(circle, ${slide.glow} 0%, transparent 65%)` }}
          />
          <div
            key={shoeKey}
            className="hero-shoe-active hero-shoe-idle relative z-10 w-full max-w-[340px] md:max-w-[460px] lg:max-w-[540px] aspect-square"
          >
            <img
              src={slide.image}
              alt={slide.name}
              className="w-full h-full object-contain select-none"
              style={{ filter: `drop-shadow(0 30px 70px ${slide.glow})` }}
              draggable={false}
            />
          </div>

          {/* floating price badge */}
          <div
            key={`badge-${activeIdx}`}
            className="absolute z-30 bottom-6 left-1 md:bottom-10 md:left-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-xl"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
              style={{ background: slide.accent }}
            >
              ★
            </div>
            <div>
              <p className="text-white font-black text-sm leading-none">{slide.price}</p>
              <p className="text-white/40 text-[10px] mt-0.5">Free returns</p>
            </div>
          </div>

          {/* floating tag badge */}
          <div
            key={`tag2-${activeIdx}`}
            className="absolute top-8 right-4 md:top-12 md:right-0 bg-white text-gray-900 rounded-2xl px-3 py-1.5 shadow-2xl text-xs font-black animate-float-slow"
          >
            {slide.tag} 🔥
          </div>
        </div>

        {/* ── RIGHT: passport thumbnails ── */}
        <div className="hidden md:flex flex-col gap-3 items-center justify-center self-center order-3">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`passport-card passport-stagger rounded-xl overflow-hidden border-2 transition-all duration-300
                ${i === activeIdx
                  ? "border-white shadow-2xl scale-105"
                  : "border-white/10 opacity-50 hover:opacity-80 scale-95"
                }`}
              style={{ width: 88, height: 110, animationDelay: `${i * 0.1}s` }}
              aria-label={s.name}
            >
              <div className={`w-full h-full bg-gradient-to-br ${s.bg} relative flex flex-col`}>
                <img src={s.thumb} alt={s.name} className="w-full h-[72px] object-cover object-center" />
                <div className="flex-1 px-1.5 py-1 bg-black/40 backdrop-blur-sm flex flex-col justify-center">
                  <p className="text-white/80 text-[8px] font-bold tracking-wide uppercase truncate text-center leading-tight">
                    {s.name.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <p className="text-center font-black text-[9px]" style={{ color: s.accent }}>
                    {s.price}
                  </p>
                </div>
                {i === activeIdx && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: s.accent }} />
                )}
              </div>
            </button>
          ))}
          <button
            onClick={next}
            className="mt-1 w-9 h-9 rounded-full border border-white/20 hover:border-white/60 flex items-center justify-center text-white/40 hover:text-white transition-all hover:bg-white/10"
          >
            <FaChevronRight size={12} />
          </button>
        </div>

        {/* ── MOBILE: dot indicators ── */}
        <div className="md:hidden flex gap-3 justify-center mt-8 order-4">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${i === activeIdx ? "w-8 h-3" : "w-3 h-3"} ${s.dotColor}`}
            />
          ))}
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0 flex gap-1 px-6 pb-6 z-20">
        {HERO_SLIDES.map((s, i) => (
          <div key={s.id} className="progress-bar flex-1">
            {i === activeIdx && !paused && (
              <div
                key={progressKey}
                className="progress-fill running"
                style={{ "--duration": `${SLIDE_DURATION}ms` } as React.CSSProperties}
              />
            )}
            {i < activeIdx && (
              <div className="progress-fill w-full" style={{ background: s.accent }} />
            )}
          </div>
        ))}
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-10 left-8 flex-col items-center gap-2 opacity-40 hidden md:flex">
        <span className="text-[10px] text-gray-400 tracking-widest uppercase" style={{ writingMode: "vertical-rl" }}>
          Scroll Down
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
