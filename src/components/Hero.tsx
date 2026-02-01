import { ArrowRight, BookOpen, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="beranda" className="relative min-h-screen flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="PPTQ Cahaya Tasbih"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/30 to-primary/60" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gold/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "4s" }} />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          {/* Harlah ke-6 Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary via-accent to-gold shadow-2xl mb-8 animate-fade-up border border-white/20">
            <span className="text-2xl">🎉</span>
            <div className="text-left">
              <span className="block text-sm font-bold text-white">HARLAH KE-6</span>
              <span className="block text-xs text-white/90">2 Februari 2020 - 2 Februari 2026</span>
            </div>
            <span className="text-2xl">🕌</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Pondok Pesantren
            <br />
            <span className="text-gradient-gold">Tahfidz Quran</span>
            <br />
            <span className="text-white">Cahaya Tasbih</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Mencetak Generasi Hafidz dan Hafidzoh Berakhlak Mulia, 
            Berprestasi dalam Ilmu Dunia dan Akhirat
          </p>


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
                <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-accent mx-auto mb-2" />
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
