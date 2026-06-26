import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import RevealDiv from "./RevealDiv";

const PromoBanner = () => (
  <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
    <div className="grid md:grid-cols-2 gap-6">

      {/* Running collection */}
      <RevealDiv direction="left">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-red-700 p-10 min-h-[320px] flex flex-col justify-end group cursor-pointer card-hover">
          <div className="absolute top-6 right-6 text-[120px] opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 select-none">
            👟
          </div>
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
            UP TO 40% OFF
          </span>
          <h3 className="text-3xl font-black mb-2">Running Collection</h3>
          <p className="text-white/80 mb-6">Built for every stride. Light, fast, relentless.</p>
          <Link
            to="/shop"
            className="btn-shine flex items-center gap-2 bg-white text-orange-600 font-bold px-6 py-3 rounded-full w-fit hover:scale-105 transition-transform"
          >
            Shop Running <FaArrowRight />
          </Link>
        </div>
      </RevealDiv>

      {/* Lifestyle series */}
      <RevealDiv direction="right">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 to-indigo-900 p-10 min-h-[320px] flex flex-col justify-end group cursor-pointer card-hover">
          <div className="absolute top-6 right-6 text-[120px] opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 select-none">
            👠
          </div>
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
            EXCLUSIVE STYLES
          </span>
          <h3 className="text-3xl font-black mb-2">Lifestyle Series</h3>
          <p className="text-white/80 mb-6">From morning coffee to late-night vibes.</p>
          <Link
            to="/shop"
            className="btn-shine flex items-center gap-2 bg-white text-violet-700 font-bold px-6 py-3 rounded-full w-fit hover:scale-105 transition-transform"
          >
            Shop Lifestyle <FaArrowRight />
          </Link>
        </div>
      </RevealDiv>

    </div>
  </section>
);

export default PromoBanner;
