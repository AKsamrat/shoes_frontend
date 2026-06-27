import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTrash, FaArrowLeft, FaArrowRight, FaShoppingBag,
  FaTag, FaTruck, FaShieldAlt, FaUndo, FaCheckCircle,
  FaMinus, FaPlus, FaTimes,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeItem, updateQty, clearCart } from "../store/cartSlice";
import { FEATURED } from "../components/home/homeData";

/* ── helpers ─────────────────────────────────────────────── */
const SHIPPING_THRESHOLD = 50;
const SHIPPING_COST      = 9.99;

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });


/* ── Empty state ─────────────────────────────────────────── */
const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center py-32 text-center px-6">
    <div
      className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
      style={{
        background: "rgba(249,115,22,0.08)",
        border: "1px solid rgba(249,115,22,0.2)",
      }}
    >
      <FaShoppingBag size={36} className="text-orange-400" />
    </div>
    <h2 className="text-2xl font-black text-white mb-2">Your cart is empty</h2>
    <p className="text-white/35 text-sm mb-8 max-w-xs">
      Looks like you haven't added anything yet. Explore our collection and find your perfect pair.
    </p>
    <Link
      to="/shop"
      className="flex items-center gap-2 font-bold px-7 py-3.5 rounded-full text-white text-sm transition-all hover:scale-105"
      style={{ background: "#f97316", boxShadow: "0 8px 28px rgba(249,115,22,0.35)" }}
    >
      <FaShoppingBag size={13} /> Start Shopping
    </Link>
  </div>
);


/* ── Main Cart ───────────────────────────────────────────── */
const Cart = () => {
  const dispatch  = useAppDispatch();
  const items     = useAppSelector((s) => s.cart.items);
  const [coupon,  setCoupon]  = useState("");
  const [applied, setApplied] = useState(false);
  const [couponErr, setCouponErr] = useState("");

  const subtotal  = items.reduce(
    (acc, i) => acc + parseInt(i.price.replace("$", "")) * i.qty, 0
  );
  const discount  = applied ? subtotal * 0.1 : 0;
  const shipping  = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total     = subtotal - discount + shipping;

  const handleCoupon = () => {
    if (coupon.trim().toUpperCase() === "EMIRATES10") {
      setApplied(true);
      setCouponErr("");
    } else {
      setCouponErr("Invalid coupon code.");
      setApplied(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">

      {/* ambient */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-[0.04] bg-orange-500" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none opacity-[0.04] bg-orange-600" />

      <div className="max-w-7xl mx-auto px-5 md:px-10 py-10 relative z-10">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white">
              Shopping Cart
            </h1>
            <p className="text-white/35 text-sm mt-1">
              {items.length === 0
                ? "No items yet"
                : `${items.reduce((a, i) => a + i.qty, 0)} item${items.reduce((a, i) => a + i.qty, 0) !== 1 ? "s" : ""} in your cart`}
            </p>
          </div>
          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors group"
          >
            <FaArrowLeft size={11} className="group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">

            {/* ══════════════════════════════════════
                LEFT — cart items
            ══════════════════════════════════════ */}
            <div className="flex flex-col gap-4">

              {/* clear all */}
              <div className="flex justify-end">
                <button
                  onClick={() => dispatch(clearCart())}
                  className="flex items-center gap-1.5 text-white/25 hover:text-red-400 text-xs transition-colors"
                >
                  <FaTimes size={10} /> Clear all
                </button>
              </div>

              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 p-4 rounded-2xl relative group"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  {/* top shimmer */}
                  <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

                  {/* thumbnail */}
                  <Link to={`/product/${item.slug}`} className="flex-shrink-0">
                    <div
                      className={`w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gradient-to-br ${item.color} flex items-center justify-center`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* info */}
                  <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/product/${item.slug}`}
                        className="font-bold text-white text-sm hover:text-orange-400 transition-colors leading-tight line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => dispatch(removeItem({ id: item.id, size: item.size }))}
                        aria-label="Remove"
                        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <FaTrash size={11} />
                      </button>
                    </div>

                    {/* size badge */}
                    <span
                      className="inline-flex w-fit text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(249,115,22,0.1)",
                        border: "1px solid rgba(249,115,22,0.2)",
                        color: "#f97316",
                      }}
                    >
                      Size {item.size}
                    </span>

                    {/* price + qty */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-end gap-2">
                        <span className="text-lg font-black text-orange-400">
                          {fmt(parseInt(item.price.replace("$", "")) * item.qty)}
                        </span>
                        <span className="text-white/25 text-xs pb-0.5 line-through">
                          {fmt(parseInt(item.oldPrice.replace("$", "")) * item.qty)}
                        </span>
                      </div>

                      {/* qty stepper */}
                      <div
                        className="flex items-center gap-0 rounded-xl overflow-hidden"
                        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                      >
                        <button
                          onClick={() => dispatch(updateQty({ id: item.id, size: item.size, qty: item.qty - 1 }))}
                          className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <FaMinus size={9} />
                        </button>
                        <span className="w-9 text-center text-sm font-black text-white">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => dispatch(updateQty({ id: item.id, size: item.size, qty: item.qty + 1 }))}
                          className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <FaPlus size={9} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* ── You may also like ── */}
              <div className="mt-6">
                <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-4">
                  You May Also Like
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {FEATURED.slice(0, 4).map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.slug}`}
                      className="group rounded-2xl overflow-hidden transition-all hover:-translate-y-1"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className={`h-28 bg-gradient-to-br ${p.color} overflow-hidden`}>
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-2.5">
                        <p className="text-white text-[11px] font-bold truncate">{p.name}</p>
                        <p className="text-orange-400 text-[11px] font-black mt-0.5">{p.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════
                RIGHT — order summary
            ══════════════════════════════════════ */}
            <div className="flex flex-col gap-4 lg:sticky lg:top-24">

              {/* summary card */}
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                {/* orange top bar */}
                <div className="h-[2px] bg-gradient-to-r from-orange-500 via-red-500 to-orange-400" />

                <div className="p-6 flex flex-col gap-5">
                  <h3 className="font-black text-lg text-white">Order Summary</h3>

                  {/* rows */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-white/50">
                      <span>Subtotal</span>
                      <span className="text-white font-semibold">{fmt(subtotal)}</span>
                    </div>
                    {applied && (
                      <div className="flex justify-between text-emerald-400">
                        <span className="flex items-center gap-1.5">
                          <FaCheckCircle size={10} /> Coupon (10%)
                        </span>
                        <span>− {fmt(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-white/50">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? "text-emerald-400 font-semibold" : "text-white font-semibold"}>
                        {shipping === 0 ? "Free" : fmt(shipping)}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <div
                        className="rounded-xl px-3 py-2 text-[11px] text-white/40"
                        style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.12)" }}
                      >
                        Add {fmt(SHIPPING_THRESHOLD - subtotal)} more for{" "}
                        <span className="text-orange-400 font-bold">free shipping</span>
                      </div>
                    )}
                    <div className="h-px bg-white/5" />
                    <div className="flex justify-between text-base font-black">
                      <span className="text-white">Total</span>
                      <span className="text-orange-400">{fmt(total)}</span>
                    </div>
                  </div>

                  {/* coupon */}
                  <div>
                    <p className="text-xs text-white/35 font-semibold tracking-wide mb-2">Coupon Code</p>
                    <div className="flex gap-2">
                      <div
                        className="flex items-center gap-2 flex-1 px-3 rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.09)",
                        }}
                      >
                        <FaTag size={11} className="text-white/20 flex-shrink-0" />
                        <input
                          type="text"
                          value={coupon}
                          onChange={e => { setCoupon(e.target.value); setCouponErr(""); setApplied(false); }}
                          placeholder="EMIRATES10"
                          className="flex-1 bg-transparent text-white text-sm py-2.5 outline-none placeholder-white/20"
                        />
                      </div>
                      <button
                        onClick={handleCoupon}
                        className="px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                        style={{ background: "#f97316", boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}
                      >
                        Apply
                      </button>
                    </div>
                    {couponErr && <p className="text-red-400 text-xs mt-1.5">{couponErr}</p>}
                    {applied && (
                      <p className="text-emerald-400 text-xs mt-1.5 flex items-center gap-1">
                        <FaCheckCircle size={9} /> 10% discount applied!
                      </p>
                    )}
                  </div>

                  {/* checkout btn */}
                  <button
                    className="w-full flex items-center justify-center gap-2.5 font-black py-4 rounded-2xl text-white text-sm transition-all hover:scale-[1.02] hover:brightness-110"
                    style={{ background: "#f97316", boxShadow: "0 8px 28px rgba(249,115,22,0.35)" }}
                  >
                    Proceed to Checkout
                    <FaArrowRight size={13} />
                  </button>

                  {/* trust pills */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { Icon: FaTruck,     label: "Free Ship"   },
                      { Icon: FaUndo,      label: "30-Day Return" },
                      { Icon: FaShieldAlt, label: "Secure Pay"  },
                    ].map(({ Icon, label }) => (
                      <div
                        key={label}
                        className="flex flex-col items-center gap-1 py-2.5 rounded-xl text-center"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <Icon size={13} className="text-orange-400" />
                        <span className="text-white/35 text-[9px] leading-tight">{label}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* payment icons */}
              <div className="flex items-center justify-center gap-2">
                {["VISA","MC","AMEX","PayPal"].map(p => (
                  <span
                    key={p}
                    className="border border-white/10 rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-white/25"
                  >
                    {p}
                  </span>
                ))}
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
