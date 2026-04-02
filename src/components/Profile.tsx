import { Building2, GraduationCap, BookOpen, Users, Calendar, MapPin, FileText, Mail, Globe, CreditCard, Star, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useSiteContentBySection } from "@/hooks/useSiteContent";
import mosqueDome from "@/assets/mosque-dome.jpg";

const iconMap: Record<string, React.ElementType> = {
  Building2, GraduationCap, BookOpen, Users, Calendar, MapPin, FileText, Mail, Globe, CreditCard, Star,
};

const Profile = () => {
  const { data: content } = useSiteContentBySection("profil");

  const getVal = (key: string) => content?.find((c) => c.key === key)?.value;

  const header = (getVal("header") || {}) as Record<string, string>;
  const yayasanData = (getVal("yayasan_data") || []) as { label: string; value: string }[];
  const pendidikanFormal = (getVal("pendidikan_formal") || []) as any[];
  const pendidikanNonFormal = (getVal("pendidikan_nonformal") || {}) as any;
  const keunggulan = (getVal("keunggulan") || []) as string[];

  return (
    <section id="profil" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      <div className="absolute inset-0 pattern-islamic opacity-20" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{header.badge || "Profil Yayasan"}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Yayasan <span className="text-gradient">{header.title || "PPTQ Cahaya Tasbih"}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {header.description || "Lembaga pendidikan Islam terpadu yang mengintegrasikan pendidikan formal dengan program tahfidz Al-Quran, mencetak generasi hafidz berakhlak mulia."}
          </p>
        </div>

        {/* Hero Image with Quote */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          <div className="relative">
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-4 rounded-3xl overflow-hidden shadow-lg">
                <img src={mosqueDome} alt="Masjid PPTQ Cahaya Tasbih" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 border-2 border-primary/20 rounded-3xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 gradient-accent rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 gradient-primary rounded-2xl -z-10" />
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

          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {header.subtitle || "Mendidik Generasi Qurani yang Berprestasi"}
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed"
               dangerouslySetInnerHTML={{ __html: header.hero_description || "" }} />

            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {keunggulan.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <blockquote className="relative pl-6 border-l-4 border-accent italic text-muted-foreground">
              "{header.quote || ""}"
              <footer className="mt-2 font-semibold text-foreground not-italic">
                — {header.quote_author || ""}
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="yayasan" className="w-full">
          <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-secondary/50 p-2 rounded-2xl mb-8">
            <TabsTrigger value="yayasan" className="flex-1 min-w-[140px] data-[state=active]:gradient-primary data-[state=active]:text-white rounded-xl py-3 px-4 font-medium transition-all">
              <Building2 className="w-4 h-4 mr-2" /> Profil Yayasan
            </TabsTrigger>
            <TabsTrigger value="formal" className="flex-1 min-w-[140px] data-[state=active]:gradient-primary data-[state=active]:text-white rounded-xl py-3 px-4 font-medium transition-all">
              <GraduationCap className="w-4 h-4 mr-2" /> Pendidikan Formal
            </TabsTrigger>
            <TabsTrigger value="nonformal" className="flex-1 min-w-[180px] data-[state=active]:gradient-primary data-[state=active]:text-white rounded-xl py-3 px-4 font-medium transition-all">
              <BookOpen className="w-4 h-4 mr-2" /> Pendidikan Non Formal
            </TabsTrigger>
          </TabsList>

          {/* Profil Yayasan Tab */}
          <TabsContent value="yayasan" className="animate-fade-up">
            <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
              <div className="gradient-primary p-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <Building2 className="w-6 h-6" /> Data Yayasan PPTQ Cahaya Tasbih
                </h3>
              </div>
              <div className="p-6">
                <Table>
                  <TableBody>
                    {yayasanData.map((item, index) => (
                      <TableRow key={index} className="hover:bg-secondary/30">
                        <TableCell className="w-8 text-muted-foreground font-medium">{index + 1}.</TableCell>
                        <TableCell className="font-medium text-foreground">{item.label}</TableCell>
                        <TableCell className="text-muted-foreground w-4">:</TableCell>
                        <TableCell className="text-foreground">{item.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          {/* Pendidikan Formal Tab */}
          <TabsContent value="formal" className="animate-fade-up">
            <div className="grid md:grid-cols-2 gap-6">
              {pendidikanFormal.map((sekolah: any) => (
                <div key={sekolah.no} className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
                  <div className={`${sekolah.color === 'accent' ? 'gradient-accent' : 'gradient-primary'} p-6`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">{sekolah.no}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white">{sekolah.nama}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <Table>
                      <TableBody>
                        {sekolah.data?.map((item: any, idx: number) => (
                          <TableRow key={idx} className="hover:bg-secondary/30">
                            <TableCell className="font-medium text-primary min-w-[120px]">{item.label}</TableCell>
                            <TableCell className="text-muted-foreground w-4">{item.label ? ":" : ""}</TableCell>
                            <TableCell className="text-foreground">{item.value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Pertumbuhan Siswa</p>
                        <p className="font-bold text-foreground">
                          {sekolah.growth} <span className="text-xs text-primary ml-2">({sekolah.growthPercent})</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Pendidikan Non Formal Tab */}
          <TabsContent value="nonformal" className="animate-fade-up">
            <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden max-w-2xl mx-auto">
              <div className="gradient-primary p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{pendidikanNonFormal.nama || ""}</h3>
                </div>
              </div>
              <div className="p-6">
                <Table>
                  <TableBody>
                    {(pendidikanNonFormal.data || []).map((item: any, idx: number) => (
                      <TableRow key={idx} className="hover:bg-secondary/30">
                        <TableCell className="font-medium text-primary min-w-[120px]">{item.label}</TableCell>
                        <TableCell className="text-muted-foreground w-4">:</TableCell>
                        <TableCell className="text-foreground">{item.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {pendidikanNonFormal.ketuaYayasan && (
                  <div className="mt-8 text-center border-t border-border pt-6">
                    <p className="text-sm text-muted-foreground mb-2">Mengetahui</p>
                    <p className="font-medium text-foreground mb-4">{pendidikanNonFormal.ketuaYayasan.label}</p>
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl gradient-accent">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-white">{pendidikanNonFormal.ketuaYayasan.nama}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Profile;
