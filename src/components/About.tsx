import { Check, Star } from "lucide-react";
import mosqueDome from "@/assets/mosque-dome.jpg";

const About = () => {
  const features = [
    "Program Tahfidz Al-Quran 30 Juz",
    "Kurikulum Pendidikan Formal SMP & MA",
    "Pengasuh: Abah KH. Imroni Abdillah",
    "Akreditasi A untuk semua unit pendidikan",
    "Ekstrakurikuler lengkap dan berprestasi",
    "Fasilitas modern dan nyaman",
  ];

  return (
    <section id="profil" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div className="relative">
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              {/* Main Image */}
              <div className="absolute inset-4 rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={mosqueDome}
                  alt="Masjid PPTQ Cahaya Tasbih"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Frame */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-3xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 gradient-accent rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 gradient-primary rounded-2xl -z-10" />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-card shadow-lg rounded-2xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Akreditasi A</p>
                    <p className="text-sm text-muted-foreground">SMP & MA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary">Tentang Kami</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Mendidik Generasi{" "}
              <span className="text-gradient">Qurani</span>{" "}
              yang Berprestasi
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Yayasan PPTQ CAHAYA TASBIH merupakan lembaga pendidikan Islam terpadu 
              yang mengintegrasikan pendidikan formal dengan program tahfidz Al-Quran. 
              Di bawah asuhan Abah KH. Imroni Abdillah beserta Umi, kami berkomitmen 
              mencetak generasi hafidz dan hafidzoh yang berakhlak mulia serta 
              berprestasi dalam berbagai bidang.
            </p>

            {/* Feature List */}
            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Quote */}
            <blockquote className="relative pl-6 border-l-4 border-accent italic text-muted-foreground">
              "Jadilah penghafal Al-Quran yang tidak hanya hafal lafalnya, 
              tetapi juga mengamalkan kandungannya dalam kehidupan sehari-hari."
              <footer className="mt-2 font-semibold text-foreground not-italic">
                — Abah KH. Imroni Abdillah
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
