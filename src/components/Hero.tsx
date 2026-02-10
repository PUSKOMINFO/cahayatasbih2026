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
    <section id="beranda" className="relative min-h-screen flex items-center justify-end">
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
            className="w-full h-full object-cover object-top"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/30 to-primary/60" />

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gold/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "4s" }} />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-32 md:py-40 flex justify-end">
        <div className="max-w-2xl text-right">
          {/* Juara LKBB Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/95 shadow-2xl mb-8 animate-fade-up border border-primary/20 backdrop-blur-sm">
            <span className="text-2xl">🏆</span>
            <div className="text-left">
              <span className="block text-sm font-bold text-primary">JUARA LKBB</span>
              <span className="block text-xs text-primary/70">Februari 2026</span>
            </div>
            <span className="text-2xl">🎖️</span>
          </div>

          {/* Subtitle */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20 mb-10 animate-fade-up ml-auto max-w-lg" style={{ animationDelay: "0.2s" }}>
            <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
              Mencetak Generasi <span className="text-accent font-bold">Hafidz</span> dan <span className="text-accent font-bold">Hafidzoh</span> Berakhlak Mulia, 
              Berprestasi dalam Ilmu Dunia dan Akhirat
            </p>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-end gap-2 mb-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
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

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: BookOpen, value: "1000+", label: "Santri Aktif" },
              { icon: Users, value: "50+", label: "Tenaga Pengajar" },
              { icon: Award, value: "100+", label: "Prestasi" },
              { icon: BookOpen, value: "30+", label: "Hafidz/Hafidzoh" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-accent ml-auto mb-2" />
                <p className="text-xl md:text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs md:text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-2.5 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
