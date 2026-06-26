import { BRANDS } from "./homeData";

const BrandTicker = () => {
  const text = Array(4)
    .fill(BRANDS.map((b) => `✦ ${b.name}`).join("  "))
    .join("  ");

  return (
    <div className="bg-orange-500 py-4 overflow-hidden">
      <div className="ticker-wrap">
        <div className="ticker-inner text-white font-bold text-sm tracking-widest uppercase">
          {text}
        </div>
      </div>
    </div>
  );
};

export default BrandTicker;
