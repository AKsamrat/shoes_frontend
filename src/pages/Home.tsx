import HeroSection       from "../components/home/HeroSection";
import BrandTicker       from "../components/home/BrandTicker";
import CategorySection   from "../components/home/CategorySection";
import FeaturedSection   from "../components/home/FeaturedSection";
import PromoBanner       from "../components/home/PromoBanner";
import BrandsSection     from "../components/home/BrandsSection";
import WhyUsSection      from "../components/home/WhyUsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import SocialGrid        from "../components/home/SocialGrid";
import NewsletterSection from "../components/home/NewsletterSection";

const Home = () => (
  <div className="bg-[#0a0a0f] text-white overflow-x-hidden">
    <HeroSection />          {/* 1. Cinematic shoe slideshow          */}
    <BrandTicker />          {/* 2. Scrolling brand marquee            */}
    <CategorySection />      {/* 3. Shop by category grid              */}
    <FeaturedSection />      {/* 4. Featured product cards             */}
    <PromoBanner />          {/* 5. Running + Lifestyle promo cards    */}
    <BrandsSection />        {/* 6. Top brands grid                    */}
    <WhyUsSection />         {/* 7. Why Emirates Shoes feature cards    */}
    <TestimonialsSection />  {/* 8. Customer testimonials              */}
    <SocialGrid />           {/* 9. Community social photo grid        */}
    <NewsletterSection />    {/* 10. Email subscribe CTA               */}
  </div>
);

export default Home;
