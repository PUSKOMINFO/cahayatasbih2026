import { useState, useEffect, useCallback } from "react";
import { BookOpen, Users, Award } from "lucide-react";
import { useSiteContentBySection } from "@/hooks/useSiteContent";
import heroBg from "@/assets/hero-bg.jpg";
import heroSlide1 from "@/assets/hero-slide-1.jpeg";
import heroSlide2 from "@/assets/hero-slide-2.jpeg";
import heroSlide3 from "@/assets/hero-slide-3.jpeg";
import heroSlide4 from "@/assets/hero-slide-4.jpeg";

const defaultSlides = [heroBg, heroSlide1, heroSlide2, heroSlide3, heroSlide4];

const iconMap: Record<string, React.ElementType> = {
  BookOpen, Users, Award,
};

const Hero = () => {
  const { data: heroContent } = useSiteContentBySection("hero");
  const [current, setCurrent] = useState(0);

  // Get dynamic content
  const getVal = (key: string) => heroContent?.find((c) => c.key === key)?.value;
  
  const dbImages = getVal("images") as string[] | undefined;
  const slides = dbImages && dbImages.length > 0 ? dbImages : defaultSlides;
  const badge = getVal("badge") as { title: string; subtitle: string } | undefined;
  const stats = getVal("stats") as Array<{ icon: string; value: string; label: string }> | undefined;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  // Reset current if slides change
  useEffect(() => {
    setCurrent(0);
  }, [slides.length]);

  const defaultStats = [
    { icon: "BookOpen", value: "1000+", label: "Santri Aktif" },
    { icon: "Users", value: "50+", label: "Tenaga Pengajar" },
    { icon: "Award", value: "100+", label: "Prestasi" },
    { icon: "BookOpen", value: "30+", label: "Hafidz/Hafidzoh" },
  ];

  const displayStats = stats || defaultStats;
  const displayBadge = badge || { title: "JUARA LKBB", subtitle: "Februari 2026" };

  return (
    <section id="beranda" className="relative min-h-screen flex flex-col">
      {/* Background Slides */}
      {slides.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={src}
            alt={`PPTQ Cahaya Tasbih ${i + 1}`}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/20" />

      <div className="flex-1" />

      <div className="relative container mx-auto px-4 pb-20 pt-8">
        {/* Badge row */}
        <div className="flex flex-wrap items-center gap-3 mb-4 animate-fade-up">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/95 shadow-xl border border-primary/20 backdrop-blur-sm">
            <span className="text-xl">🏆</span>
            <div className="text-left">
              <span className="block text-sm font-bold text-primary">{displayBadge.title}</span>
              <span className="block text-xs text-primary/70">{displayBadge.subtitle}</span>
            </div>
            <span className="text-xl">🎖️</span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-accent" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          {displayStats.map((stat, index) => {
            const Icon = iconMap[stat.icon] || BookOpen;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 flex items-center gap-3"
              >
                <Icon className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <p className="text-xl md:text-2xl font-bold text-white leading-tight">{stat.value}</p>
                  <p className="text-xs md:text-sm text-white/70">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
