import { FaTruck, FaShieldAlt, FaUndo, FaHeadset } from "react-icons/fa";
import RevealDiv from "./RevealDiv";

const FEATURES = [
  {
    icon: <FaTruck size={28} />,
    title: "Free Shipping",
    desc: "Free delivery on all orders over $50 worldwide.",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    icon: <FaShieldAlt size={28} />,
    title: "2-Year Warranty",
    desc: "Every pair backed by our premium quality guarantee.",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: <FaUndo size={28} />,
    title: "Easy Returns",
    desc: "Not happy? Return within 30 days, no questions asked.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: <FaHeadset size={28} />,
    title: "24/7 Support",
    desc: "Our team is always here to help you find the perfect fit.",
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
  },
];

const WhyUsSection = () => (
  <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
    <RevealDiv direction="up" className="text-center mb-16">
      <p className="text-orange-400 font-semibold tracking-widest uppercase text-sm mb-3">
        Why Emirates Shoes
      </p>
      <h2 className="text-4xl md:text-5xl font-black">Built Around You</h2>
    </RevealDiv>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {FEATURES.map((f, i) => (
        <RevealDiv key={f.title} direction="up" delay={`delay-${(i + 1) * 100}`}>
          <div className={`card-hover border ${f.bg} rounded-2xl p-7 h-full`}>
            <div className={`${f.color} mb-4`}>{f.icon}</div>
            <h3 className="font-bold text-lg mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        </RevealDiv>
      ))}
    </div>
  </section>
);

export default WhyUsSection;
