import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FaBars, FaTimes, FaChevronDown,
  FaShoppingCart, FaSearch, FaUser,
} from "react-icons/fa";
import { navRoutes } from "../../routes/navRoutes";
import { useAppSelector } from "../../store/hooks";

/* ── cart count from Redux ── */
const useCartCount = () =>
  useAppSelector((s) => s.cart.items.reduce((acc, i) => acc + i.qty, 0));

const Navbar = () => {
  const [isOpen,       setIsOpen]       = useState(false);
  const [openSub,      setOpenSub]      = useState<string | null>(null);
  const [scrolled,     setScrolled]     = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const location  = useLocation();
  const cartCount = useCartCount();

  /* close mobile menu on route change */
  useEffect(() => { setIsOpen(false); setOpenSub(null); }, [location]);

  /* scroll-aware glass effect */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* focus search input when opened */
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-[#0a0a0f]/90 backdrop-blur-xl shadow-2xl shadow-black/40 border-b border-white/5"
          : "bg-[#0a0a0f]/95 backdrop-blur-md border-b border-white/5"
        }
      `}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex items-center gap-2.5 flex-shrink-0 group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
            <span className="text-white font-black text-sm">E</span>
          </div>
          <span className="text-white font-black text-xl tracking-tight">
            EMIRATES <span className="text-orange-400">SHOES</span>
          </span>
        </Link>

        {/* ── Desktop nav links ── */}
        <ul className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {navRoutes.map((item) => (
            <li key={item.name} className="relative group">
              {item.children ? (
                /* dropdown trigger */
                <>
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all group-hover:text-white group-hover:bg-white/5">
                    {item.name}
                    <FaChevronDown
                      size={10}
                      className="transition-transform duration-200 group-hover:rotate-180 text-white/30 group-hover:text-white/60"
                    />
                  </button>

                  {/* dropdown panel */}
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                    <ul className="min-w-[180px] bg-[#151520] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 p-1.5">
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <NavLink
                            to={child.path!}
                            className={({ isActive }) =>
                              `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all
                              ${isActive
                                ? "bg-orange-500/15 text-orange-400 font-semibold"
                                : "text-white/60 hover:text-white hover:bg-white/5"
                              }`
                            }
                          >
                            {child.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <NavLink
                  to={item.path!}
                  className={({ isActive }) =>
                    `relative px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${isActive
                      ? "text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      {/* animated underline */}
                      <span
                        className={`absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-orange-500 transition-all duration-300
                          ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}
                      />
                    </>
                  )}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-1 flex-shrink-0">

          {/* search bar / icon */}
          <div className="relative hidden md:flex items-center">
            <div
              className={`flex items-center overflow-hidden transition-all duration-300 rounded-full
                ${searchOpen ? "w-48 bg-white/10 border border-white/15 px-3" : "w-9 justify-center"}`}
            >
              <button
                onClick={() => setSearchOpen(v => !v)}
                aria-label="Search"
                className="flex-shrink-0 w-9 h-9 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                {searchOpen ? <FaTimes size={14} /> : <FaSearch size={14} />}
              </button>
              {searchOpen && (
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search shoes…"
                  className="flex-1 bg-transparent text-white text-sm placeholder-white/30 outline-none h-9 pr-2"
                />
              )}
            </div>
          </div>

          {/* account */}
          <Link
            to="/login"
            aria-label="Account"
            className="hidden md:flex w-9 h-9 items-center justify-center text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-all"
          >
            <FaUser size={14} />
          </Link>

          {/* cart */}
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative flex w-9 h-9 items-center justify-center text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-all"
          >
            <FaShoppingCart size={16} />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 rounded-full bg-orange-500 text-white text-[9px] font-black flex items-center justify-center px-0.5 leading-none shadow-lg shadow-orange-500/40">
                {cartCount}
              </span>
            )}
          </Link>

          {/* shop CTA button — desktop */}
          <Link
            to="/shop"
            className="hidden lg:flex ml-2 items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105"
          >
            Shop Now
          </Link>

          {/* mobile hamburger */}
          <button
            onClick={() => setIsOpen(v => !v)}
            aria-label="Menu"
            className="lg:hidden ml-1 w-9 h-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-all"
          >
            {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════
          Mobile drawer
      ══════════════════════════════════════════════ */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-[#0f0f18] border-t border-white/5 px-5 py-4 space-y-1">

          {/* search */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 mb-4">
            <FaSearch size={12} className="text-white/30" />
            <input
              type="text"
              placeholder="Search shoes…"
              className="flex-1 bg-transparent text-white text-sm placeholder-white/30 outline-none"
            />
          </div>

          {navRoutes.map((item) => (
            <div key={item.name}>
              {item.children ? (
                <>
                  <button
                    onClick={() => setOpenSub(openSub === item.name ? null : item.name)}
                    className="flex items-center justify-between w-full px-3 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 text-sm font-medium transition-all"
                  >
                    {item.name}
                    <FaChevronDown
                      size={11}
                      className={`transition-transform text-white/30 ${openSub === item.name ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${openSub === item.name ? "max-h-60" : "max-h-0"}`}
                  >
                    <div className="ml-3 pl-3 border-l border-white/10 space-y-0.5 mt-1 mb-2">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.name}
                          to={child.path!}
                          className={({ isActive }) =>
                            `block px-3 py-2.5 rounded-lg text-sm transition-all
                            ${isActive ? "text-orange-400 font-semibold bg-orange-500/10" : "text-white/50 hover:text-white hover:bg-white/5"}`
                          }
                        >
                          {child.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <NavLink
                  to={item.path!}
                  className={({ isActive }) =>
                    `block px-3 py-3 rounded-xl text-sm font-medium transition-all
                    ${isActive ? "text-white bg-white/8 font-semibold" : "text-white/60 hover:text-white hover:bg-white/5"}`
                  }
                >
                  {item.name}
                </NavLink>
              )}
            </div>
          ))}

          {/* mobile bottom actions */}
          <div className="pt-3 mt-3 border-t border-white/5 flex gap-3">
            <Link
              to="/login"
              className="flex-1 flex items-center justify-center gap-2 border border-white/10 text-white/60 hover:text-white text-sm font-semibold py-3 rounded-xl transition-all hover:bg-white/5"
            >
              <FaUser size={13} /> Account
            </Link>
            <Link
              to="/shop"
              className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold py-3 rounded-xl transition-all"
            >
              <FaShoppingCart size={13} /> Shop Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
