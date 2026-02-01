import { 
  Store, 
  Smartphone, 
  CreditCard, 
  Wallet, 
  ShoppingCart, 
  Receipt, 
  Shield, 
  Zap,
  CheckCircle,
  ArrowRight,
  Heart,
  Stethoscope,
  UserCheck,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import cahayaMart from "@/assets/cahaya-mart.jpg";
import waliSantriApp from "@/assets/wali-santri-app.jpg";
import kartuSantriDigital from "@/assets/kartu-santri-digital.jpg";
import ruangPerawatan from "@/assets/ruang-perawatan.jpg";

const Facilities = () => {
  const cahayaMartFeatures = [
    { icon: ShoppingCart, text: "Kebutuhan santri lengkap tersedia" },
    { icon: CreditCard, text: "Transaksi non-tunai dengan Kartu Santri Digital" },
    { icon: Smartphone, text: "Terintegrasi dengan Aplikasi Wali Santri" },
    { icon: Shield, text: "Monitoring pengeluaran santri real-time" },
  ];

  const appFeatures = [
    {
      icon: Receipt,
      title: "Pembayaran Syahriah",
      description: "Bayar SPP bulanan dengan mudah dan cepat",
    },
    {
      icon: Wallet,
      title: "LKS & Zarkasi",
      description: "Pembayaran buku LKS dan kitab Zarkasi online",
    },
    {
      icon: CreditCard,
      title: "Uang Saku Santri",
      description: "Top up saldo uang saku santri kapan saja",
    },
    {
      icon: Zap,
      title: "Notifikasi Real-time",
      description: "Info transaksi dan pengumuman langsung ke HP",
    },
  ];

  const digitalCardBenefits = [
    "Identitas santri digital yang praktis",
    "Transaksi cashless di CAHAYA MART",
    "Tidak perlu membawa uang tunai",
    "Aman dan terpantau oleh orang tua",
    "Rekap transaksi otomatis",
  ];

  const healthCareFeatures = [
    { icon: Stethoscope, text: "Dipantau langsung oleh tenaga kesehatan profesional" },
    { icon: UserCheck, text: "Dokter pondok siap siaga 24 jam" },
    { icon: Sparkles, text: "Ruangan bersih dan steril" },
    { icon: Heart, text: "Perawatan penuh kasih sayang" },
  ];

  const healthCareBenefits = [
    "Penanganan cepat untuk santri yang sakit",
    "Obat-obatan lengkap tersedia",
    "Koordinasi langsung dengan wali santri",
    "Rujukan ke rumah sakit jika diperlukan",
    "Pemeriksaan kesehatan berkala",
  ];

  return (
    <section id="fasilitas" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Store className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Fasilitas Modern</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Layanan <span className="text-gradient">Digital</span> Terpadu
          </h2>
          <p className="text-lg text-muted-foreground">
            PPTQ Cahaya Tasbih menghadirkan fasilitas modern dengan sistem transaksi digital 
            yang terintegrasi untuk kemudahan santri dan wali santri.
          </p>
        </div>

        {/* CAHAYA MART Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          {/* Image */}
          <div className="relative group">
            <div className="relative rounded-3xl overflow-hidden shadow-lg">
              <img
                src={cahayaMart}
                alt="CAHAYA MART - Minimarket Santri"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 gradient-hero opacity-20" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-card shadow-xl rounded-2xl p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-foreground">CAHAYA MART</p>
                  <p className="text-sm text-muted-foreground">Minimarket Santri</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full gradient-accent mb-4">
              <span className="text-xs font-semibold text-white">UNIT LAYANAN</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              CAHAYA MART
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Unit layanan yang menyediakan <strong className="text-foreground">semua kebutuhan santri</strong> dengan 
              pelayanan modern berbasis aplikasi. Transaksi menggunakan sistem digital yang terintegrasi 
              dengan Aplikasi Wali Santri untuk transparansi dan kemudahan monitoring.
            </p>

            <ul className="space-y-4 mb-8">
              {cahayaMartFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-foreground">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* App & Digital Card Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          {/* Wali Santri App */}
          <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-2/5 flex-shrink-0">
                <img
                  src={waliSantriApp}
                  alt="Aplikasi Wali Santri"
                  className="w-full max-w-[200px] mx-auto h-auto object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <Smartphone className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium text-primary">APLIKASI</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  Aplikasi Wali Santri
                </h3>
                <p className="text-muted-foreground mb-6">
                  Kemudahan layanan administrasi pembayaran dalam genggaman Anda.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {appFeatures.map((feature, index) => (
                    <div key={index} className="p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                      <feature.icon className="w-5 h-5 text-primary mb-2" />
                      <p className="text-sm font-medium text-foreground">{feature.title}</p>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Digital Santri Card */}
          <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-sm">
            <div className="mb-6">
              <img
                src={kartuSantriDigital}
                alt="Kartu Santri Digital"
                className="w-full max-w-[320px] mx-auto h-auto object-contain rounded-2xl shadow-md"
              />
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full gradient-primary mb-4">
                <CreditCard className="w-3 h-3 text-white" />
                <span className="text-xs font-semibold text-white">KARTU DIGITAL</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Kartu Santri Digital
              </h3>
              <p className="text-muted-foreground mb-6">
                Kartu identitas sekaligus alat pembayaran non-tunai untuk transaksi di CAHAYA MART.
              </p>
              <ul className="space-y-2 text-left max-w-sm mx-auto">
                {digitalCardBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Health Care Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 mb-4">
              <Heart className="w-3 h-3 text-destructive" />
              <span className="text-xs font-medium text-destructive">KESEHATAN SANTRI</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ruang Perawatan Santri
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Fasilitas kesehatan dengan <strong className="text-foreground">ruang perawatan yang bersih dan steril</strong> untuk 
              santri yang membutuhkan perawatan kesehatan. Dipantau langsung oleh tenaga kesehatan profesional 
              dan dokter dari pondok pesantren.
            </p>

            <ul className="space-y-4 mb-8">
              {healthCareFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-destructive" />
                  </div>
                  <span className="text-foreground">{feature.text}</span>
                </li>
              ))}
            </ul>

            {/* Benefits Grid */}
            <div className="bg-secondary/50 rounded-2xl p-5">
              <h4 className="font-semibold text-foreground mb-4">Layanan Kesehatan Kami:</h4>
              <ul className="space-y-2">
                {healthCareBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Image */}
          <div className="relative group order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-lg">
              <img
                src={ruangPerawatan}
                alt="Ruang Perawatan Santri"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-card shadow-xl rounded-2xl p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Klinik Santri</p>
                  <p className="text-sm text-muted-foreground">24 Jam Siaga</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 gradient-primary" />
          <div className="absolute inset-0 pattern-islamic opacity-10" />
          <div className="relative p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Sistem Terintegrasi untuk Kemudahan Bersama
            </h3>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Dengan teknologi modern, kami memastikan transparansi dan kemudahan dalam setiap 
              transaksi serta layanan administrasi untuk santri dan wali santri.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="lg" className="group">
                Daftar Sekarang
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="heroOutline" size="lg">
                Hubungi Kami
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facilities;
