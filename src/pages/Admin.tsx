import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAllSiteContent, useUpdateSiteContent } from "@/hooks/useSiteContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  LogOut,
  Save,
  Home,
  FileText,
  Trophy,
  Phone,
  BookOpen,
  Info,
  Loader2,
  Shield,
} from "lucide-react";

const sectionLabels: Record<string, { label: string; icon: React.ElementType }> = {
  hero: { label: "Hero Section", icon: Home },
  about: { label: "Tentang Kami", icon: Info },
  programs: { label: "Program Unggulan", icon: BookOpen },
  achievements: { label: "Prestasi", icon: Trophy },
  contact: { label: "Kontak", icon: Phone },
};

const Admin = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: allContent, isLoading } = useAllSiteContent();
  const updateContent = useUpdateSiteContent();
  const [activeSection, setActiveSection] = useState("hero");
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="bg-card rounded-3xl p-8 border border-border shadow-lg text-center max-w-md">
          <Shield className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Akses Ditolak</h1>
          <p className="text-muted-foreground mb-6">
            Akun Anda tidak memiliki hak akses admin. Hubungi administrator untuk mendapatkan akses.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              Beranda
            </Button>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const sectionContent = allContent?.filter((c) => c.section === activeSection) ?? [];

  const getEditValue = (section: string, key: string, original: unknown) => {
    const editKey = `${section}:${key}`;
    if (editValues[editKey] !== undefined) return editValues[editKey];
    return typeof original === "string" ? original : JSON.stringify(original, null, 2);
  };

  const setEditValue = (section: string, key: string, value: string) => {
    setEditValues((prev) => ({ ...prev, [`${section}:${key}`]: value }));
  };

  const handleSave = async (section: string, key: string) => {
    const editKey = `${section}:${key}`;
    const raw = editValues[editKey];
    if (raw === undefined) return;

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = raw;
    }

    try {
      await updateContent.mutateAsync({ section, key, value: parsed });
      toast({ title: "Berhasil disimpan!" });
      setEditValues((prev) => {
        const next = { ...prev };
        delete next[editKey];
        return next;
      });
    } catch (err: any) {
      toast({
        title: "Gagal menyimpan",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const renderEditor = (item: { section: string; key: string; value: unknown }) => {
    const val = getEditValue(item.section, item.key, item.value);
    const isModified = editValues[`${item.section}:${item.key}`] !== undefined;
    const isSimpleString = typeof item.value === "string";

    return (
      <div key={`${item.section}-${item.key}`} className="bg-card rounded-2xl p-5 border border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-semibold text-foreground capitalize">
              {item.key.replace(/_/g, " ")}
            </h4>
            <p className="text-xs text-muted-foreground">
              {item.section} / {item.key}
            </p>
          </div>
          <Button
            size="sm"
            disabled={!isModified || updateContent.isPending}
            onClick={() => handleSave(item.section, item.key)}
            className="gradient-primary text-white"
          >
            <Save className="w-4 h-4 mr-1" />
            Simpan
          </Button>
        </div>
        {isSimpleString ? (
          <Input
            value={val}
            onChange={(e) => setEditValue(item.section, item.key, e.target.value)}
            className="h-11"
          />
        ) : (
          <Textarea
            value={val}
            onChange={(e) => setEditValue(item.section, item.key, e.target.value)}
            className="min-h-[200px] font-mono text-sm resize-y"
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Beranda</span>
            </Button>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="bg-card rounded-2xl border border-border p-3 space-y-1 lg:sticky lg:top-24">
              {Object.entries(sectionLabels).map(([key, { label, icon: Icon }]) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeSection === key
                      ? "bg-primary text-white font-semibold"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {sectionLabels[activeSection]?.label || activeSection}
              </h2>
              <p className="text-muted-foreground">
                Edit konten yang tampil di halaman publik
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : sectionContent.length === 0 ? (
              <div className="bg-card rounded-2xl p-8 border border-border text-center">
                <p className="text-muted-foreground">Belum ada konten untuk section ini.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sectionContent.map(renderEditor)}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
