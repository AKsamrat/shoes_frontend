import { FaInstagram, FaTwitter, FaTiktok, FaHeart, FaComment } from "react-icons/fa";
import RevealDiv from "./RevealDiv";
import { SOCIAL_POSTS } from "./homeData";

const SocialGrid = () => (
  <section className="relative py-24 px-6 md:px-12 overflow-hidden bg-[#0a0a0f]">

    {/* ambient blobs */}
    <div className="absolute top-0 left-1/4 w-80 h-80 bg-orange-500 rounded-full opacity-[0.05] blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600 rounded-full opacity-[0.05] blur-3xl pointer-events-none" />

    <div className="max-w-7xl mx-auto relative z-10">

      {/* heading */}
      <RevealDiv direction="up" className="text-center mb-16">
        <p className="text-orange-400 font-semibold tracking-widest uppercase text-sm mb-3">
          @EmiratesShoes
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-white">
          Shot by the Community
        </h2>
        <p className="text-white/30 mt-3 text-sm">
          Tag us in your shots for a chance to be featured
        </p>
      </RevealDiv>

      {/* grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {SOCIAL_POSTS.map((item, i) => (
          <RevealDiv key={item.handle} direction="scale" delay={`delay-${(i % 4 + 1) * 100}`}>
            <div
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
                transition: "transform 0.35s cubic-bezier(.16,1,.3,1), box-shadow 0.35s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px) scale(1.04)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 20px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.08)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)";
              }}
            >
              {/* top shimmer line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              {/* shoe emoji — centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-5xl select-none transition-transform duration-500 group-hover:scale-125 group-hover:-translate-y-1"
                  style={{ filter: "drop-shadow(0 4px 12px rgba(255,255,255,0.15))" }}
                >
                  {item.e}
                </span>
              </div>

              {/* instagram icon — top right */}
              <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                <FaInstagram size={11} className="text-white/50 group-hover:text-white transition-colors" />
              </div>

              {/* hover overlay — slides up */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)" }}
              >
                {/* like + comment row */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-white/70 text-[10px]">
                      <FaHeart size={9} className="text-red-400" />
                      <span>{Math.floor(Math.random() * 900 + 100)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/50 text-[10px]">
                      <FaComment size={9} />
                      <span>{Math.floor(Math.random() * 50 + 5)}</span>
                    </div>
                  </div>
                </div>
                {/* handle */}
                <span className="text-white text-[10px] font-bold tracking-wide">
                  {item.handle}
                </span>
              </div>
            </div>
          </RevealDiv>
        ))}
      </div>

      {/* social follow buttons */}
      <RevealDiv direction="up" delay="delay-300" className="flex items-center justify-center gap-4 mt-12">
        {[
          { Icon: FaInstagram, label: "Instagram", color: "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500" },
          { Icon: FaTwitter,   label: "Twitter",   color: "hover:bg-sky-500"    },
          { Icon: FaTiktok,    label: "TikTok",    color: "hover:bg-white/10"   },
        ].map(({ Icon, label, color }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-white/50 hover:text-white text-sm font-semibold transition-all duration-300 hover:scale-105 ${color}`}
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Icon size={15} />
            <span className="hidden sm:inline">{label}</span>
          </a>
        ))}
      </RevealDiv>

    </div>
  </section>
);

export default SocialGrid;
