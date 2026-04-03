import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAllSiteContent, useUpdateSiteContent } from "@/hooks/useSiteContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUploader from "@/components/admin/ImageUploader";
import HeroImagesEditor from "@/components/admin/HeroImagesEditor";
import KeunggulanEditor from "@/components/admin/KeunggulanEditor";
import KeyValueTableEditor from "@/components/admin/KeyValueTableEditor";
import PendidikanFormalEditor from "@/components/admin/PendidikanFormalEditor";
import PendidikanNonFormalEditor from "@/components/admin/PendidikanNonFormalEditor";
import ProfileHeaderEditor from "@/components/admin/ProfileHeaderEditor";
import {
  LogOut, Save, Home, FileText, Trophy, Phone, BookOpen, Info, Loader2, Shield, Store, Image as ImageIcon,
} from "lucide-react";

const sectionLabels: Record<string, { label: string; icon: React.ElementType }> = {
  hero: { label: "Hero Section", icon: Home },
  profil: { label: "Profil Yayasan", icon: FileText },
  about: { label: "Tentang Kami", icon: Info },
  programs: { label: "Program Unggulan", icon: BookOpen },
  achievements: { label: "Prestasi", icon: Trophy },
  facilities: { label: "Fasilitas", icon: Store },
  contact: { label: "Kontak", icon: Phone },
};

// Keys that should use rich text editor
const richTextKeys = new Set([
  "about:description_html",
  "programs:description_html",
  "achievements:description_html",
  "facilities:description_html",
]);

// Keys that are hero images
const imageArrayKeys = new Set(["hero:images"]);

// Keys with custom profile editors
const profileEditorKeys = new Set([
  "profil:header",
  "profil:keunggulan",
  "profil:yayasan_data",
  "profil:pendidikan_formal",
  "profil:pendidikan_nonformal",
]);

const Admin = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: allContent, isLoading } = useAllSiteContent();
  const updateContent = useUpdateSiteContent();
  const [activeSection, setActiveSection] = useState("hero");
  const [editValues, setEditValues] = useState<Record<string, unknown>>({});

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
              <Home className="w-4 h-4 mr-2" /> Beranda
            </Button>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const sectionContent = allContent?.filter((c) => c.section === activeSection) ?? [];

  const getEditValue = (section: string, key: string, original: unknown): unknown => {
    const editKey = `${section}:${key}`;
    if (editValues[editKey] !== undefined) return editValues[editKey];
    return original;
  };

  const setEditValue = (section: string, key: string, value: unknown) => {
    setEditValues((prev) => ({ ...prev, [`${section}:${key}`]: value }));
  };

  const handleSave = async (section: string, key: string) => {
    const editKey = `${section}:${key}`;
    const raw = editValues[editKey];
    if (raw === undefined) return;

    try {
      await updateContent.mutateAsync({ section, key, value: raw });
      toast({ title: "Berhasil disimpan!" });
      setEditValues((prev) => {
        const next = { ...prev };
        delete next[editKey];
        return next;
      });
    } catch (err: any) {
      toast({ title: "Gagal menyimpan", description: err.message, variant: "destructive" });
    }
  };

  const renderEditor = (item: { section: string; key: string; value: unknown }) => {
    const editKey = `${item.section}:${item.key}`;
    const currentVal = getEditValue(item.section, item.key, item.value);
    const isModified = editValues[editKey] !== undefined;

    // Hero images editor
    if (imageArrayKeys.has(editKey)) {
      const images = (Array.isArray(currentVal) ? currentVal : []) as string[];
      return (
        <div key={editKey} className="bg-card rounded-2xl p-5 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-semibold text-foreground capitalize flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" />
                Gambar Slider Hero
              </h4>
              <p className="text-xs text-muted-foreground">{item.section} / {item.key}</p>
            </div>
            <Button
              size="sm"
              disabled={!isModified || updateContent.isPending}
              onClick={() => handleSave(item.section, item.key)}
              className="gradient-primary text-white"
            >
              <Save className="w-4 h-4 mr-1" /> Simpan
            </Button>
          </div>
          <HeroImagesEditor
            images={images}
            onChange={(imgs) => setEditValue(item.section, item.key, imgs)}
          />
        </div>
      );
    }

    // Rich text editor
    if (richTextKeys.has(editKey)) {
      const htmlVal = typeof currentVal === "string" ? currentVal : "";
      return (
        <div key={editKey} className="bg-card rounded-2xl p-5 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-semibold text-foreground capitalize">
                {item.key.replace(/_/g, " ")}
              </h4>
              <p className="text-xs text-muted-foreground">{item.section} / {item.key}</p>
            </div>
            <Button
              size="sm"
              disabled={!isModified || updateContent.isPending}
              onClick={() => handleSave(item.section, item.key)}
              className="gradient-primary text-white"
            >
              <Save className="w-4 h-4 mr-1" /> Simpan
            </Button>
          </div>
          <RichTextEditor
            content={htmlVal}
            onChange={(html) => setEditValue(item.section, item.key, html)}
          />
        </div>
      );
    }

    // Profile section custom editors
    if (profileEditorKeys.has(editKey)) {
      const editorLabel: Record<string, string> = {
        header: "Header & Kutipan",
        keunggulan: "Keunggulan",
        yayasan_data: "Data Yayasan",
        pendidikan_formal: "Pendidikan Formal",
        pendidikan_nonformal: "Pendidikan Non Formal",
      };

      let editorContent: React.ReactNode = null;

      if (item.key === "header") {
        const val = (typeof currentVal === "object" && currentVal !== null ? currentVal : {}) as any;
        editorContent = <ProfileHeaderEditor value={val} onChange={(v) => setEditValue(item.section, item.key, v)} />;
      } else if (item.key === "keunggulan") {
        const val = Array.isArray(currentVal) ? currentVal : [];
        editorContent = <KeunggulanEditor items={val as string[]} onChange={(v) => setEditValue(item.section, item.key, v)} />;
      } else if (item.key === "yayasan_data") {
        const val = Array.isArray(currentVal) ? currentVal : [];
        editorContent = <KeyValueTableEditor items={val as any[]} onChange={(v) => setEditValue(item.section, item.key, v)} labelHeader="Label" valueHeader="Nilai" />;
      } else if (item.key === "pendidikan_formal") {
        const val = Array.isArray(currentVal) ? currentVal : [];
        editorContent = <PendidikanFormalEditor schools={val as any[]} onChange={(v) => setEditValue(item.section, item.key, v)} />;
      } else if (item.key === "pendidikan_nonformal") {
        const val = (typeof currentVal === "object" && currentVal !== null ? currentVal : { nama: "", data: [] }) as any;
        editorContent = <PendidikanNonFormalEditor value={val} onChange={(v) => setEditValue(item.section, item.key, v)} />;
      }

      return (
        <div key={editKey} className="bg-card rounded-2xl p-5 border border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-semibold text-foreground">{editorLabel[item.key] || item.key}</h4>
              <p className="text-xs text-muted-foreground">{item.section} / {item.key}</p>
            </div>
            <Button
              size="sm"
              disabled={!isModified || updateContent.isPending}
              onClick={() => handleSave(item.section, item.key)}
              className="gradient-primary text-white"
            >
              <Save className="w-4 h-4 mr-1" /> Simpan
            </Button>
          </div>
          {editorContent}
        </div>
      );
    }

    // Simple string or JSON editor
    const isSimpleString = typeof item.value === "string";
    const strVal = typeof currentVal === "string" ? currentVal : JSON.stringify(currentVal, null, 2);

    return (
      <div key={editKey} className="bg-card rounded-2xl p-5 border border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-semibold text-foreground capitalize">
              {item.key.replace(/_/g, " ")}
            </h4>
            <p className="text-xs text-muted-foreground">{item.section} / {item.key}</p>
          </div>
          <Button
            size="sm"
            disabled={!isModified || updateContent.isPending}
            onClick={() => handleSave(item.section, item.key)}
            className="gradient-primary text-white"
          >
            <Save className="w-4 h-4 mr-1" /> Simpan
          </Button>
        </div>
        {isSimpleString ? (
          <Input
            value={strVal}
            onChange={(e) => setEditValue(item.section, item.key, e.target.value)}
            className="h-11"
          />
        ) : (
          <Textarea
            value={strVal}
            onChange={(e) => {
              try {
                setEditValue(item.section, item.key, JSON.parse(e.target.value));
              } catch {
                setEditValue(item.section, item.key, e.target.value);
              }
            }}
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
            ) : activeSection === "profil" ? (
              <Tabs defaultValue={sectionContent[0]?.key || "header"} className="w-full">
                <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1 rounded-xl mb-4">
                  {sectionContent.map((item) => {
                    const tabLabels: Record<string, string> = {
                      header: "Header & Kutipan",
                      keunggulan: "Keunggulan",
                      yayasan_data: "Data Yayasan",
                      pendidikan_formal: "Pendidikan Formal",
                      pendidikan_nonformal: "Pendidikan Non Formal",
                    };
                    return (
                      <TabsTrigger key={item.key} value={item.key} className="text-xs sm:text-sm px-3 py-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        {tabLabels[item.key] || item.key}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
                {sectionContent.map((item) => (
                  <TabsContent key={item.key} value={item.key}>
                    {renderEditor(item)}
                  </TabsContent>
                ))}
              </Tabs>
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
