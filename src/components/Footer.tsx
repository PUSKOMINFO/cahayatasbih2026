import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
const Footer = () => {
  const quickLinks = [
    { label: "Beranda", href: "#beranda" },
    { label: "Profil", href: "#profil" },
    { label: "Program", href: "#program" },
    { label: "Prestasi", href: "#prestasi" },
    { label: "Kontak", href: "#kontak" },
  ];

  const programs = [
    { label: "Pondok Pesantren", href: "#" },
    { label: "Madrasah Aliyah", href: "#" },
    { label: "SMP Islam Terpadu", href: "#" },
    { label: "Program Tahfidz", href: "#" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 pattern-islamic opacity-5" />
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <img 
                src={logo} 
                alt="PPTQ Cahaya Tasbih" 
                className="h-14 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-background/70 mb-6 leading-relaxed">
              Pondok Pesantren Tahfidz Quran yang berkomitmen mencetak generasi 
              hafidz dan hafidzoh berakhlak mulia.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Navigasi</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold text-lg mb-6">Program</h4>
            <ul className="space-y-3">
              {programs.map((program, index) => (
                <li key={index}>
                  <a
                    href={program.href}
                    className="text-background/70 hover:text-accent transition-colors"
                  >
                    {program.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Kontak</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-background/70">
                  Jl. Raya Demak Kudus Km. 13, Desa Sari, Kec. Gajah, Kab. Demak
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="tel:+6281234567890" className="text-background/70 hover:text-accent transition-colors">
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="mailto:info@cahayatasbih.or.id" className="text-background/70 hover:text-accent transition-colors">
                  info@cahayatasbih.or.id
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/60">
            <p>© 2025 PPTQ Cahaya Tasbih. Hak Cipta Dilindungi.</p>
            <p>Website Resmi Yayasan PPTQ Cahaya Tasbih</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
