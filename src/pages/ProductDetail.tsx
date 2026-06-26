import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  FaStar, FaHeart, FaShoppingCart, FaArrowLeft,
  FaShieldAlt, FaTruck, FaUndo, FaCheckCircle,
  FaFire, FaChevronLeft, FaChevronRight, FaSearch,
} from "react-icons/fa";
import { FEATURED } from "../components/home/homeData";

/* ─── Image zoom hook ───────────────────────────────────────────── */
function useImageZoom() {
  const [zoomed,    setZoomed]    = useState(false);
  const [zoomPos,   setZoomPos]   = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((clientX - left) / width)  * 100));
    const y = Math.max(0, Math.min(100, ((clientY - top)  / height) * 100));
    setZoomPos({ x, y });
  }, []);

  const onMouseMove  = (e: React.MouseEvent)  => onMove(e.clientX, e.clientY);
  const onTouchMove  = (e: React.TouchEvent)  => onMove(e.touches[0].clientX, e.touches[0].clientY);

  return { containerRef, zoomed, setZoomed, zoomPos, onMouseMove, onTouchMove };
}

/* ─── component ─────────────────────────────────────────────────── */
const ProductDetail = () => {
  const { slug }    = useParams<{ slug: string }>();
  const navigate    = useNavigate();
  const product     = FEATURED.find(p => p.slug === slug);

  const [activeImg,   setActiveImg]   = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [qty,         setQty]         = useState(1);
  const [wishlisted,  setWishlisted]  = useState(false);
  const [added,       setAdded]       = useState(false);
  const [lightbox,    setLightbox]    = useState(false);
  const { containerRef, zoomed, setZoomed, zoomPos, onMouseMove, onTouchMove } = useImageZoom();

  /* scroll to top on mount */
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center gap-4 text-white">
        <p className="text-2xl font-black">Product not found.</p>
        <Link to="/shop" className="text-orange-400 hover:underline">← Back to shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const prevImg = () => setActiveImg(i => (i - 1 + product.images.length) % product.images.length);
  const nextImg = () => setActiveImg(i => (i + 1) % product.images.length);

  const discount = Math.round(
    (1 - parseInt(product.price.replace("$","")) / parseInt(product.oldPrice.replace("$",""))) * 100
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">

      {/* ── ambient glows ── */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none opacity-[0.04]"
        style={{ background: product.accent }} />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none opacity-[0.04]"
        style={{ background: product.accent }} />

      <div className="max-w-7xl mx-auto px-5 md:px-10 py-8 relative z-10">

        {/* ── breadcrumb ── */}
        <div className="flex items-center gap-2 text-white/30 text-xs mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-white/60">{product.name}</span>
        </div>

        {/* ── back btn ── */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors group"
        >
          <FaArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        {/* ════════════════════════════════════════
            MAIN GRID
        ════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20">

          {/* ═══ LEFT: images ═══════════════════════ */}
          <div className="flex flex-col gap-4">

            {/* main image with zoom */}
            <div
              ref={containerRef}
              className={`relative rounded-3xl overflow-hidden aspect-square cursor-crosshair select-none
                bg-gradient-to-br ${product.color}`}
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
              onMouseMove={onMouseMove}
              onTouchMove={onTouchMove}
              onClick={() => setLightbox(true)}
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* glow blob */}
              <div
                className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at center, ${product.glow}, transparent 65%)` }}
              />

              {/* image */}
              <img
                src={product.images[activeImg]}
                alt={product.name}
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-200"
                style={zoomed ? {
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: "scale(2.2)",
                  cursor: "crosshair",
                } : {
                  transform: "scale(1)",
                }}
              />

              {/* zoom hint */}
              {!zoomed && (
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur text-white/60 text-[10px] px-2.5 py-1.5 rounded-full">
                  <FaSearch size={9} /> Hover to zoom
                </div>
              )}

              {/* prev/next arrows */}
              {product.images.length > 1 && (
                <>
                  <button onClick={e => { e.stopPropagation(); prevImg(); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center hover:bg-orange-500 transition-all z-10">
                    <FaChevronLeft size={12} />
                  </button>
                  <button onClick={e => { e.stopPropagation(); nextImg(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center hover:bg-orange-500 transition-all z-10">
                    <FaChevronRight size={12} />
                  </button>
                </>
              )}

              {/* tag badge */}
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full text-white"
                  style={{ background: product.accent }}>
                  {product.tag}
                </span>
              </div>
            </div>

            {/* thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className="flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden transition-all duration-200"
                  style={{
                    border: i === activeImg
                      ? `2px solid ${product.accent}`
                      : "2px solid rgba(255,255,255,0.08)",
                    boxShadow: i === activeImg ? `0 0 12px ${product.glow}` : "none",
                    opacity: i === activeImg ? 1 : 0.5,
                  }}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ═══ RIGHT: details ════════════════════ */}
          <div className="flex flex-col gap-6">

            {/* tag + category */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full text-white"
                style={{ background: product.accent + "30", color: product.accent, border: `1px solid ${product.accent}40` }}>
                {product.category}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
                <FaFire size={8} /> {product.tag}
              </span>
            </div>

            {/* name */}
            <div>
              <h1 className="text-3xl md:text-4xl font-black leading-tight text-white mb-2">
                {product.name}
              </h1>
              <p className="text-white/40 text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* rating row */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array(5).fill(0).map((_, j) => (
                  <FaStar key={j} size={14}
                    className={j < Math.floor(product.rating) ? "text-yellow-400" : "text-white/15"} />
                ))}
              </div>
              <span className="font-bold text-sm text-white">{product.rating}</span>
              <span className="text-white/30 text-sm">({product.reviews.toLocaleString()} reviews)</span>
              <span className="text-emerald-400 text-xs flex items-center gap-1 ml-2">
                <FaCheckCircle size={10} /> Verified
              </span>
            </div>

            {/* price */}
            <div className="flex items-end gap-4 py-2">
              <span className="text-4xl font-black" style={{ color: product.accent }}>
                {product.price}
              </span>
              <span className="text-white/25 line-through text-lg pb-0.5">{product.oldPrice}</span>
              <span className="text-xs font-black px-2.5 py-1 rounded-full mb-0.5"
                style={{ background: product.accent + "20", color: product.accent }}>
                SAVE {discount}%
              </span>
            </div>

            {/* divider */}
            <div className="h-px bg-white/5" />

            {/* size selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-white">Select Size</p>
                <button className="text-xs text-white/35 hover:text-orange-400 transition-colors underline underline-offset-2">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
                    style={
                      selectedSize === size
                        ? { background: product.accent, color: "#fff", boxShadow: `0 4px 16px ${product.glow}`, border: "2px solid transparent" }
                        : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "2px solid rgba(255,255,255,0.08)" }
                    }
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-white/25 text-xs mt-2">Please select a size to continue</p>
              )}
            </div>

            {/* quantity */}
            <div>
              <p className="text-sm font-bold text-white mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-white transition-all font-bold text-lg"
                >
                  −
                </button>
                <span className="w-12 text-center font-black text-lg text-white">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-white transition-all font-bold text-lg"
                >
                  +
                </button>
                <span className="text-white/25 text-xs ml-2">In stock · Ships in 2-3 days</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="flex-1 flex items-center justify-center gap-2.5 font-black py-4 rounded-2xl text-sm transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
                style={
                  added
                    ? { background: "#10b981", boxShadow: "0 8px 24px rgba(16,185,129,0.4)" }
                    : { background: product.accent, boxShadow: `0 8px 24px ${product.glow}` }
                }
              >
                {added ? (
                  <><FaCheckCircle size={14} /> Added to Cart!</>
                ) : (
                  <><FaShoppingCart size={14} /> Add to Cart — {product.price}</>
                )}
              </button>
              <button
                onClick={() => setWishlisted(w => !w)}
                aria-label="Wishlist"
                className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-200 hover:scale-105"
                style={
                  wishlisted
                    ? { background: "rgba(239,68,68,0.15)", borderColor: "rgba(239,68,68,0.4)", color: "#ef4444" }
                    : { background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }
                }
              >
                <FaHeart size={16} />
              </button>
            </div>

            {/* features */}
            <div className="rounded-2xl p-5 space-y-2.5"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-xs font-black tracking-widest uppercase text-white/40 mb-3">Key Features</p>
              {product.features.map(f => (
                <div key={f} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: product.accent }} />
                  <span className="text-sm text-white/60">{f}</span>
                </div>
              ))}
            </div>

            {/* trust row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { Icon: FaTruck,     label: "Free Shipping",  sub: "Orders $50+"    },
                { Icon: FaUndo,      label: "Free Returns",   sub: "30-day policy"  },
                { Icon: FaShieldAlt, label: "2-Year Warranty",sub: "Certified pair" },
              ].map(({ Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5 p-3 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Icon size={16} style={{ color: product.accent }} />
                  <p className="text-white text-[11px] font-bold">{label}</p>
                  <p className="text-white/30 text-[10px]">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── related products ── */}
        <div className="mt-24">
          <h2 className="text-2xl font-black text-white mb-8">You Might Also Like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURED.filter(p => p.id !== product.id).map(p => (
              <Link
                key={p.id}
                to={`/product/${p.slug}`}
                className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className={`relative h-40 bg-gradient-to-br ${p.color} overflow-hidden`}>
                  <img src={p.image} alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <p className="font-bold text-sm text-white mb-1">{p.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm" style={{ color: p.accent }}>{p.price}</span>
                    <span className="text-white/25 line-through text-xs">{p.oldPrice}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button className="absolute top-5 right-5 text-white/50 hover:text-white text-3xl font-light">✕</button>
          <button onClick={e => { e.stopPropagation(); prevImg(); }}
            className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-all">
            <FaChevronLeft />
          </button>
          <img
            src={product.images[activeImg]}
            alt={product.name}
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <button onClick={e => { e.stopPropagation(); nextImg(); }}
            className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-all">
            <FaChevronRight />
          </button>
          <div className="absolute bottom-5 flex gap-2">
            {product.images.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setActiveImg(i); }}
                className={`w-2 h-2 rounded-full transition-all ${i === activeImg ? "bg-orange-500 w-6" : "bg-white/30"}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
