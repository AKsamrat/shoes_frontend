import { useCallback, useEffect, useRef, useState } from "react";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight, FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import RevealDiv from "./RevealDiv";
import { TESTIMONIALS } from "./homeData";

const AUTO_DELAY  = 4000;
const VISIBLE     = 3; // cards visible at once on desktop

const TestimonialsSection = () => {
  const [active,  setActive]  = useState(0);
  const [paused,  setPaused]  = useState(false);
  const [animate, setAnimate] = useState<"left" | "right" | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* drag / swipe state */
  const dragStart = useRef<number | null>(null);

  const total = TESTIMONIALS.length;

  const goTo = useCallback((idx: number, dir: "left" | "right") => {
    setAnimate(dir);
    setTimeout(() => {
      setActive(((idx % total) + total) % total);
      setAnimate(null);
    }, 320);
  }, [total]);

  const next = useCallback(() => goTo(active + 1, "left"),  [active, goTo]);
  const prev = useCallback(() => goTo(active - 1, "right"), [active, goTo]);

  /* auto-advance */
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, AUTO_DELAY);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, paused, next]);

  /* pointer drag */
  const onDragStart = (x: number) => { dragStart.current = x; };
  const onDragEnd   = (x: number) => {
    if (dragStart.current === null) return;
    const diff = dragStart.current - x;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    dragStart.current = null;
  };

  /* build visible window: show VISIBLE cards starting at (active) */
  const visibleCards = Array.from({ length: VISIBLE }, (_, i) =>
    TESTIMONIALS[(active + i) % total]
  );

  return (
    <section
      className="relative py-24 overflow-hidden bg-[#0a0a0f]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── ambient glows ── */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-orange-500 rounded-full opacity-[0.05] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600 rounded-full opacity-[0.05] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── header row ── */}
        <RevealDiv direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-orange-400 font-semibold tracking-widest uppercase text-sm mb-3">
              Real People · Real Results
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              What They're <br className="hidden md:block" />
              <span className="text-orange-400">Saying</span>
            </h2>
          </div>

          {/* aggregate rating badge */}
          <div className="flex items-center gap-4 bg-white/5 border border-white/8 rounded-2xl px-6 py-4 backdrop-blur-sm flex-shrink-0">
            <div>
              <p className="text-4xl font-black text-white leading-none">4.9</p>
              <div className="flex gap-0.5 mt-1">
                {Array(5).fill(0).map((_, i) => (
                  <FaStar key={i} size={12} className="text-yellow-400" />
                ))}
              </div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <p className="text-white font-bold text-lg leading-none">50k+</p>
              <p className="text-white/40 text-xs mt-1">Happy customers</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <p className="text-white font-bold text-lg leading-none">98%</p>
              <p className="text-white/40 text-xs mt-1">Would re-buy</p>
            </div>
          </div>
        </RevealDiv>

        {/* ── slider ── */}
        <div
          className="relative select-none"
          onMouseDown={e => onDragStart(e.clientX)}
          onMouseUp={e => onDragEnd(e.clientX)}
          onTouchStart={e => onDragStart(e.touches[0].clientX)}
          onTouchEnd={e => onDragEnd(e.changedTouches[0].clientX)}
        >
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-300
              ${animate === "left"  ? "opacity-0 -translate-x-8" : ""}
              ${animate === "right" ? "opacity-0  translate-x-8" : ""}
              ${!animate            ? "opacity-100 translate-x-0"  : ""}
            `}
          >
            {visibleCards.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className={`relative flex flex-col rounded-3xl overflow-hidden
                  ${i === 1 ? "md:scale-[1.03] md:z-10" : "md:scale-[0.97] md:opacity-85"}
                `}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: i === 1
                    ? "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)"
                    : "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                }}
              >
                {/* top shimmer line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                {/* orange accent bar — only on center card */}
                {i === 1 && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 via-red-500 to-orange-400" />
                )}

                <div className="p-7 flex flex-col h-full">

                  {/* quote icon + stars row */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-orange-500/10 border border-orange-500/20">
                      <FaQuoteLeft size={14} className="text-orange-400" />
                    </div>
                    <div className="flex gap-0.5">
                      {Array(t.rating).fill(0).map((_, j) => (
                        <FaStar key={j} size={13} className="text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  {/* review text */}
                  <p className="text-white/70 leading-relaxed flex-1 mb-6 text-[15px]">
                    "{t.text}"
                  </p>

                  {/* product pill */}
                  <div className="mb-5">
                    <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/8 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-white/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
                      {t.product}
                    </span>
                  </div>

                  {/* divider */}
                  <div className="h-px bg-white/5 mb-5" />

                  {/* author row */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* avatar */}
                      <div
                        className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.avatarBg} flex items-center justify-center font-black text-sm text-white flex-shrink-0 shadow-lg`}
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-white text-sm">{t.name}</p>
                          {t.verified && (
                            <FaCheckCircle size={11} className="text-orange-400" />
                          )}
                        </div>
                        <p className="text-white/35 text-xs">{t.role}</p>
                      </div>
                    </div>

                    {/* location */}
                    <div className="flex items-center gap-1 text-white/25 text-[10px]">
                      <FaMapMarkerAlt size={9} />
                      <span>{t.location}</span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* ── nav arrows ── */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:flex w-11 h-11 rounded-full items-center justify-center bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-500 text-white/50 hover:text-white transition-all duration-200 hover:scale-110 shadow-lg z-20"
          >
            <FaChevronLeft size={13} />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:flex w-11 h-11 rounded-full items-center justify-center bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-500 text-white/50 hover:text-white transition-all duration-200 hover:scale-110 shadow-lg z-20"
          >
            <FaChevronRight size={13} />
          </button>
        </div>

        {/* ── dot indicators + mobile arrows ── */}
        <div className="flex items-center justify-center gap-4 mt-10">

          {/* mobile prev */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-orange-500 border border-white/10 text-white/40 hover:text-white transition-all"
          >
            <FaChevronLeft size={12} />
          </button>

          {/* dots */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > active ? "left" : "right")}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`rounded-full transition-all duration-300
                  ${i === active
                    ? "w-7 h-2.5 bg-orange-500 shadow-lg shadow-orange-500/40"
                    : "w-2.5 h-2.5 bg-white/15 hover:bg-white/30"
                  }`}
              />
            ))}
          </div>

          {/* mobile next */}
          <button
            onClick={next}
            aria-label="Next"
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-orange-500 border border-white/10 text-white/40 hover:text-white transition-all"
          >
            <FaChevronRight size={12} />
          </button>
        </div>

        {/* ── progress bar ── */}
        <div className="mt-6 max-w-xs mx-auto h-px bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
            style={{ width: `${((active + 1) / total) * 100}%` }}
          />
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
