import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import { useSiteContent } from "@/hooks/useSiteContent";

const iconMap: Record<string, React.ElementType> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
};

// Simple SVG icons for platforms not in lucide
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const extendedIconMap: Record<string, React.ElementType> = {
  ...iconMap,
  tiktok: TikTokIcon,
  twitter: TwitterIcon,
};

const Footer = () => {
  const { data: socialLinks } = useSiteContent("social_media", "links");

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

  const activeSocials = Array.isArray(socialLinks)
    ? (socialLinks as Array<{ platform: string; url: string; icon: string; enabled: boolean }>).filter((s) => s.enabled)
    : [];

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 pattern-islamic opacity-5" />
      
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <img src={logo} alt="PPTQ Cahaya Tasbih" className="h-14 w-auto brightness-0 invert" />
            </div>
            <p className="text-background/70 mb-6 leading-relaxed">
              Pondok Pesantren Tahfidz Quran yang berkomitmen mencetak generasi hafidz dan hafidzoh berakhlak mulia.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {activeSocials.map((social, index) => {
                const Icon = extendedIconMap[social.icon] || Mail;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Navigasi</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-background/70 hover:text-accent transition-colors">
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
                  <a href={program.href} className="text-background/70 hover:text-accent transition-colors">
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
