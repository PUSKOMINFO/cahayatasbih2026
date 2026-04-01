import { Trophy, Medal, Star, Award } from "lucide-react";
import { useSiteContentBySection } from "@/hooks/useSiteContent";

const iconMap: Record<string, React.ElementType> = {
  Trophy, Medal, Star, Award,
};

const Achievements = () => {
  const { data: achContent } = useSiteContentBySection("achievements");

  const getVal = (key: string) => achContent?.find((c) => c.key === key)?.value;

  const header = (getVal("header") as { title: string; subtitle: string }) || {
    title: "Ukiran Prestasi Gemilang",
    subtitle: "Santri PPTQ Cahaya Tasbih tidak hanya unggul dalam hafalan Al-Quran, tetapi juga menorehkan prestasi membanggakan di berbagai bidang.",
  };
  const descriptionHtml = getVal("description_html") as string | undefined;

  const items = (getVal("items") as Array<{
    icon?: string; title: string; subtitle: string; category: string; year: string;
  }>) || [];

  const stats = (getVal("stats") as Array<{ value: string; label: string }>) || [
    { value: "100+", label: "Total Prestasi" },
    { value: "50+", label: "Tingkat Nasional" },
    { value: "30+", label: "Juara 1" },
    { value: "20+", label: "Bidang Lomba" },
  ];

  return (
    <section id="prestasi" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Trophy className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent-foreground">Prestasi Santri</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ukiran <span className="text-gradient-gold">Prestasi</span> Gemilang
          </h2>
          {descriptionHtml ? (
            <div className="text-lg text-muted-foreground prose prose-sm max-w-none mx-auto" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
          ) : (
            <p className="text-lg text-muted-foreground">{header.subtitle}</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((achievement, index) => {
            const Icon = iconMap[achievement.icon || "Trophy"] || Trophy;
            return (
              <div
                key={index}
                className="group relative bg-card rounded-2xl p-6 border border-border hover:border-accent/40 transition-all duration-300 hover:shadow-md overflow-hidden"
              >
                <div className="absolute inset-0 gradient-accent opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent/10 text-accent-foreground">
                    {achievement.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground leading-tight">{achievement.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{achievement.subtitle}</p>
                <p className="text-xs font-semibold text-primary">{achievement.year}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-secondary/50 border border-border">
              <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
