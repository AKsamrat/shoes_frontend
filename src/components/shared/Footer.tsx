import { Link } from "react-router-dom";
import {
  FaInstagram, FaTwitter, FaTiktok, FaFacebookF, FaYoutube,
  FaArrowRight, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
  FaCreditCard, FaShieldAlt, FaTruck, FaUndo,
} from "react-icons/fa";

/* ── data ─────────────────────────────────────────────────────────── */
const FOOTER_LINKS = [
  {
    heading: "Shop",
    links: [
      { label: "All Products",      to: "/shop" },
      { label: "Running Shoes",     to: "/shop" },
      { label: "Lifestyle Sneakers",to: "/shop" },
      { label: "Trail & Outdoor",   to: "/shop" },
      { label: "New Arrivals",      to: "/shop" },
      { label: "Sale",              to: "/shop" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Our Brand",     to: "/OurBrand"      },
      { label: "We Care",       to: "/WeCare"        },
      { label: "Business Value",to: "/BusinessValue" },
      { label: "News Feed",     to: "/Newsfeed"      },
      { label: "Contact Us",    to: "/contact"       },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Track My Order",    to: "/" },
      { label: "Returns & Refunds", to: "/" },
      { label: "Size Guide",        to: "/" },
      { label: "FAQ",               to: "/" },
      { label: "Privacy Policy",    to: "/" },
      { label: "Terms of Service",  to: "/" },
    ],
  },
];

const SOCIAL = [
  { Icon: FaInstagram,  href: "#", label: "Instagram", color: "hover:bg-pink-600"   },
  { Icon: FaTwitter,    href: "#", label: "Twitter",   color: "hover:bg-sky-500"    },
  { Icon: FaTiktok,     href: "#", label: "TikTok",    color: "hover:bg-black"      },
  { Icon: FaFacebookF,  href: "#", label: "Facebook",  color: "hover:bg-blue-600"   },
  { Icon: FaYoutube,    href: "#", label: "YouTube",   color: "hover:bg-red-600"    },
];

const TRUST = [
  { Icon: FaTruck,      label: "Free Shipping $50+"  },
  { Icon: FaUndo,       label: "30-Day Returns"       },
  { Icon: FaShieldAlt,  label: "2-Year Warranty"      },
  { Icon: FaCreditCard, label: "Secure Checkout"      },
];

/* ── component ────────────────────────────────────────────────────── */
const Footer = () => (
  <footer className="bg-[#07070d] text-white border-t border-white/5">

    {/* ── Trust bar ── */}
    <div className="border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        {TRUST.map(({ Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
              <Icon size={15} className="text-orange-400" />
            </div>
            <span className="text-white/50 text-xs font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>

    {/* ── Main footer grid ── */}
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr_1fr] gap-12">

      {/* ── Brand column ── */}
      <div className="space-y-6">
        {/* logo */}
        <Link to="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
            <span className="text-white font-black text-sm">E</span>
          </div>
          <span className="text-white font-black text-2xl tracking-tight">
            EMIRATES <span className="text-orange-400">SHOES</span>
          </span>
        </Link>

        <p className="text-white/40 text-sm leading-relaxed max-w-xs">
          Engineered for performance, designed for life. Emirates Shoes brings you
          premium footwear that moves with you — from the track to the streets.
        </p>

        {/* social icons */}
        <div className="flex gap-2">
          {SOCIAL.map(({ Icon, href, label, color }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className={`w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-white ${color} border-transparent transition-all duration-200 hover:scale-110`}
            >
              <Icon size={14} />
            </a>
          ))}
        </div>

        {/* contact */}
        <div className="space-y-2.5">
          <a href="tel:+18001234567" className="flex items-center gap-2.5 text-white/40 hover:text-white text-sm transition-colors">
            <FaPhoneAlt size={11} className="text-orange-400/70" />
            +1 800 123 4567
          </a>
          <a href="mailto:support@emiratesshoes.com" className="flex items-center gap-2.5 text-white/40 hover:text-white text-sm transition-colors">
            <FaEnvelope size={11} className="text-orange-400/70" />
            support@emiratesshoes.com
          </a>
          <div className="flex items-start gap-2.5 text-white/40 text-sm">
            <FaMapMarkerAlt size={11} className="text-orange-400/70 mt-0.5 flex-shrink-0" />
            123 Sneaker Ave, New York, NY 10001
          </div>
        </div>
      </div>

      {/* ── Link columns ── */}
      {FOOTER_LINKS.map(({ heading, links }) => (
        <div key={heading} className="space-y-5">
          <h4 className="text-white font-bold text-sm tracking-widest uppercase">
            {heading}
          </h4>
          <ul className="space-y-3">
            {links.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="text-white/40 hover:text-orange-400 text-sm transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200">
                    <FaArrowRight size={9} />
                  </span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* ── Newsletter strip ── */}
    <div className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-white font-bold mb-0.5">Stay ahead of every drop</p>
          <p className="text-white/40 text-sm">Join 50k+ sneakerheads. No spam, ever.</p>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center gap-2 w-full md:w-auto"
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 md:w-64 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 outline-none focus:border-orange-500/50 focus:bg-white/8 transition-all"
          />
          <button
            type="submit"
            className="flex-shrink-0 flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-orange-500/25"
          >
            Subscribe <FaArrowRight size={11} />
          </button>
        </form>
      </div>
    </div>

    {/* ── Bottom bar ── */}
    <div className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-white/25 text-xs">
          © {new Date().getFullYear()} Emirates Shoes. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
            <Link key={item} to="/" className="text-white/25 hover:text-white/60 text-xs transition-colors">
              {item}
            </Link>
          ))}
        </div>
        {/* payment icons */}
        <div className="flex items-center gap-2 text-white/20">
          {["VISA", "MC", "AMEX", "PayPal"].map((p) => (
            <span key={p} className="border border-white/10 rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wide">
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>

  </footer>
);

export default Footer;
