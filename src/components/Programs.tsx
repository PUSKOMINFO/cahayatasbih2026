import { BookOpen, GraduationCap, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import studentsLearning from "@/assets/students-learning.jpg";

const Programs = () => {
  const programs = [
    {
      icon: BookOpen,
      title: "Pondok Pesantren",
      subtitle: "Program Tahfidz Quran",
      description:
        "Program unggulan menghafal Al-Quran 30 Juz dengan metode talaqqi dan muroja'ah yang dibimbing oleh para hafidz berpengalaman.",
      features: ["Target 30 Juz", "Metode Talaqqi", "Muroja'ah Harian", "Sanad Quran"],
      color: "primary",
    },
    {
      icon: GraduationCap,
      title: "Madrasah Aliyah",
      subtitle: "Pendidikan Formal Setara SMA",
      description:
        "Pendidikan formal tingkat menengah atas dengan kurikulum nasional plus pendidikan Islam terpadu dan program tahfidz.",
      features: ["Akreditasi A", "Kurikulum K13", "Lab Komputer", "Bahasa Arab & Inggris"],
      color: "accent",
    },
    {
      icon: Users,
      title: "SMP Islam Terpadu",
      subtitle: "Pendidikan Formal Setara SMP",
      description:
        "Pendidikan menengah pertama unggulan dengan sistem fullday dan boarding school terintegrasi dengan program pondok.",
      features: ["Akreditasi A", "Fullday School", "Boarding System", "Ekstrakurikuler Lengkap"],
      color: "primary",
    },
  ];

  return (
    <section id="program" className="py-20 md:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pattern-islamic opacity-30" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">Unit Pendidikan</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Program <span className="text-gradient">Unggulan</span> Kami
          </h2>
          <p className="text-lg text-muted-foreground">
            Kami menyediakan berbagai program pendidikan yang terintegrasi untuk 
            membentuk santri yang hafidz, berilmu, dan berakhlak mulia.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="group bg-card rounded-3xl p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all duration-500 border border-border hover:border-primary/30 relative overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              
              {/* Icon, Title, and Subtitle */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 rounded-2xl ${program.color === 'accent' ? 'gradient-accent' : 'gradient-primary'} flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                  <program.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-center flex-1">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-sm font-medium text-primary">{program.subtitle}</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">{program.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {program.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Link */}
              <Button variant="ghost" className="group/btn p-0 h-auto font-semibold text-primary hover:text-primary">
                Pelajari Lebih Lanjut
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>

        {/* Featured Image Section */}
        <div className="mt-16 lg:mt-24 relative">
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src={studentsLearning}
              alt="Santri belajar Al-Quran"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 gradient-hero opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center text-center p-8">
              <div>
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
                  Bergabunglah Bersama Kami
                </h3>
                <p className="text-white/80 max-w-2xl mx-auto mb-6">
                  Daftarkan putra-putri Anda untuk menjadi bagian dari generasi penghafal Al-Quran 
                  yang berakhlak mulia dan berprestasi.
                </p>
                <Button variant="hero" size="lg">
                  Daftar PSB 2026/2027
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
