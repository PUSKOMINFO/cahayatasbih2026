import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "./RichTextEditor";

interface ProfileHeader {
  badge?: string;
  title?: string;
  description?: string;
  subtitle?: string;
  hero_description?: string;
  quote?: string;
  quote_author?: string;
}

interface ProfileHeaderEditorProps {
  value: ProfileHeader;
  onChange: (value: ProfileHeader) => void;
}

const ProfileHeaderEditor = ({ value, onChange }: ProfileHeaderEditorProps) => {
  const update = (field: string, val: string) => {
    onChange({ ...value, [field]: val });
  };

  const fields: { key: keyof ProfileHeader; label: string; type?: "rich" | "textarea" }[] = [
    { key: "badge", label: "Badge Text" },
    { key: "title", label: "Judul Utama" },
    { key: "description", label: "Deskripsi", type: "textarea" },
    { key: "subtitle", label: "Sub Judul" },
    { key: "hero_description", label: "Deskripsi Hero (HTML)", type: "rich" },
    { key: "quote", label: "Kutipan", type: "textarea" },
    { key: "quote_author", label: "Penulis Kutipan" },
  ];

  return (
    <div className="space-y-4">
      {fields.map(({ key, label, type }) => (
        <div key={key}>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">{label}</label>
          {type === "rich" ? (
            <RichTextEditor content={value[key] || ""} onChange={(html) => update(key, html)} />
          ) : type === "textarea" ? (
            <Textarea value={value[key] || ""} onChange={(e) => update(key, e.target.value)} className="min-h-[80px]" />
          ) : (
            <Input value={value[key] || ""} onChange={(e) => update(key, e.target.value)} className="h-10" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfileHeaderEditor;
