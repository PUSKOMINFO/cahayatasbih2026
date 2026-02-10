import { useState, useEffect, useCallback } from "react";
import { BookOpen, Users, Award } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import heroSlide1 from "@/assets/hero-slide-1.jpeg";
import heroSlide2 from "@/assets/hero-slide-2.jpeg";
import heroSlide3 from "@/assets/hero-slide-3.jpeg";
import heroSlide4 from "@/assets/hero-slide-4.jpeg";

const slides = [heroBg, heroSlide1, heroSlide2, heroSlide3, heroSlide4];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

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

      {/* Spacer to push content to bottom */}
      <div className="flex-1" />

      {/* Content at bottom */}
      <div className="relative container mx-auto px-4 pb-20 pt-8">
        {/* Badge row */}
        <div className="flex flex-wrap items-center gap-3 mb-4 animate-fade-up">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/95 shadow-xl border border-primary/20 backdrop-blur-sm">
            <span className="text-xl">🏆</span>
            <div className="text-left">
              <span className="block text-sm font-bold text-primary">JUARA LKBB</span>
              <span className="block text-xs text-primary/70">Februari 2026</span>
            </div>
            <span className="text-xl">🎖️</span>
          </div>

          {/* Slide Indicators */}
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

        {/* Subtitle */}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          {[
            { icon: BookOpen, value: "1000+", label: "Santri Aktif" },
            { icon: Users, value: "50+", label: "Tenaga Pengajar" },
            { icon: Award, value: "100+", label: "Prestasi" },
            { icon: BookOpen, value: "30+", label: "Hafidz/Hafidzoh" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 flex items-center gap-3"
            >
              <stat.icon className="w-8 h-8 text-accent flex-shrink-0" />
              <div>
                <p className="text-xl md:text-2xl font-bold text-white leading-tight">{stat.value}</p>
                <p className="text-xs md:text-sm text-white/70">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
