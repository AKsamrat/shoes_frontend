import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

const Topbar = () => (
  <div className="hidden md:block bg-[#0a0a0f] border-b border-white/5 text-xs text-white/40">
    <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-9">

      {/* left — contact */}
      <div className="flex items-center gap-6">
        <a href="tel:+18001234567" className="flex items-center gap-1.5 hover:text-white transition-colors">
          <FaPhoneAlt size={10} />
          <span>+1 800 123 4567</span>
        </a>
        <a href="mailto:support@emiratesshoes.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
          <FaEnvelope size={10} />
          <span>support@emiratesshoes.com</span>
        </a>
      </div>

      {/* center — promo */}
      <div className="flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
        <span className="text-white/60 tracking-wide">
          Free shipping on all orders over <span className="text-orange-400 font-semibold">$50</span>
        </span>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
      </div>

      {/* right — social */}
      <div className="flex items-center gap-3">
        {[
          { Icon: FaFacebookF, href: "#", label: "Facebook" },
          { Icon: FaInstagram, href: "#", label: "Instagram" },
          { Icon: FaTwitter,   href: "#", label: "Twitter"  },
          { Icon: FaTiktok,    href: "#", label: "TikTok"   },
        ].map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="hover:text-orange-400 transition-colors"
          >
            <Icon size={12} />
          </a>
        ))}
      </div>

    </div>
  </div>
);

export default Topbar;
