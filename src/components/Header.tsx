import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import logo from "@/assets/logo.png";

type PsbSchool = { id: string; name: string; label: string; url: string; enabled: boolean };
type PsbConfig = { year: string; schools: PsbSchool[]; enabled: boolean };

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: psbData } = useSiteContent("psb", "button");
  const psb = (psbData && typeof psbData === "object" ? psbData : { year: "2026", schools: [], enabled: true }) as PsbConfig;
  const activeSchools = Array.isArray(psb.schools) ? psb.schools.filter((s) => s.enabled) : [];
  const psbLabel = `Daftar PSB ${psb.year || "2026"}`;

  const navItems = [
    { label: "Beranda", href: "#beranda" },
    {
      label: "Profil Kami",
      submenu: [
        { label: "PPTQ Cahaya Tasbih", href: "#profil" },
        { label: "SMP Unggulan", href: "#smp" },
        { label: "Madrasah Aliyah", href: "#ma" },
      ],
    },
    { label: "Program", href: "#program" },
    { label: "Prestasi", href: "#prestasi" },
    { label: "Fasilitas", href: "#fasilitas" },
    { label: "Kontak", href: "#kontak" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <img 
              src={logo} 
              alt="PPTQ Cahaya Tasbih" 
              className="h-10 md:h-14 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {navItems.map((item) =>
                  item.submenu ? (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuTrigger className="text-sm font-medium text-foreground hover:bg-primary hover:text-white transition-colors bg-transparent data-[state=open]:bg-primary data-[state=open]:text-white">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-48 gap-1 p-2">
                          {item.submenu.map((subItem) => (
                            <li key={subItem.label}>
                              <NavigationMenuLink asChild>
                                <a
                                  href={subItem.href}
                                  className="block px-3 py-2 text-sm rounded-md hover:bg-primary hover:text-white transition-colors"
                                >
                                  {subItem.label}
                                </a>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuLink asChild>
                        <a
                          href={item.href}
                          className="px-3 py-2 text-sm font-medium text-foreground hover:bg-primary hover:text-white rounded-md transition-colors"
                        >
                          {item.label}
                        </a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {psb.enabled !== false && activeSchools.length > 0 && (
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 data-[state=open]:bg-primary/90 data-[state=open]:text-primary-foreground">
                      {psbLabel}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-52 gap-1 p-2">
                        {activeSchools.map((school) => (
                          <li key={school.id}>
                            <NavigationMenuLink asChild>
                              <a
                                href={school.url || "#"}
                                target={school.url ? "_blank" : undefined}
                                rel={school.url ? "noopener noreferrer" : undefined}
                                className="block px-3 py-2 text-sm rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                              >
                                {school.label || school.name}
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-secondary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.submenu ? (
                    <details className="group">
                      <summary className="flex items-center justify-between px-3 py-2 text-foreground hover:bg-primary hover:text-white rounded-md cursor-pointer transition-colors">
                        {item.label}
                        <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <ul className="ml-4 mt-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.label}>
                            <a
                              href={subItem.href}
                              className="block px-3 py-2 text-sm text-muted-foreground hover:bg-primary hover:text-white rounded-md transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <a
                      href={item.href}
                      className="block px-3 py-2 text-foreground hover:bg-primary hover:text-white rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-border">
              {psb.enabled !== false && (
                psb.url ? (
                  <a href={psb.url} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="hero" className="w-full">{psb.label}</Button>
                  </a>
                ) : (
                  <Button variant="hero" className="w-full">{psb.label}</Button>
                )
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
