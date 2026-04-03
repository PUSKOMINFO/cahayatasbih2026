import { Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const platformOptions = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "twitter", label: "Twitter / X" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telegram", label: "Telegram" },
  { value: "linkedin", label: "LinkedIn" },
];

export interface SocialMediaItem {
  platform: string;
  url: string;
  icon: string;
  enabled: boolean;
}

interface SocialMediaEditorProps {
  items: SocialMediaItem[];
  onChange: (items: SocialMediaItem[]) => void;
}

const SocialMediaEditor = ({ items, onChange }: SocialMediaEditorProps) => {
  const update = (index: number, field: keyof SocialMediaItem, val: string | boolean) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: val };
    onChange(next);
  };

  const updatePlatform = (index: number, icon: string) => {
    const next = [...items];
    const label = platformOptions.find((p) => p.value === icon)?.label || icon;
    next[index] = { ...next[index], icon, platform: label };
    onChange(next);
  };

  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const add = () => {
    onChange([...items, { platform: "Facebook", url: "", icon: "facebook", enabled: true }]);
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="grid grid-cols-[1fr_2fr_80px_36px] gap-3 px-1 pb-2 border-b border-border">
        <span className="text-xs font-semibold text-muted-foreground">Platform</span>
        <span className="text-xs font-semibold text-muted-foreground">URL</span>
        <span className="text-xs font-semibold text-muted-foreground text-center">Aktif</span>
        <span />
      </div>

      {items.map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-[1fr_2fr_80px_36px] gap-3 items-center group bg-secondary/30 rounded-xl px-3 py-2"
        >
          <Select value={item.icon} onValueChange={(v) => updatePlatform(i, v)}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {platformOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            value={item.url}
            onChange={(e) => update(i, "url", e.target.value)}
            placeholder="https://..."
            className="h-9 text-sm"
          />

          <div className="flex justify-center">
            <Switch
              checked={item.enabled}
              onCheckedChange={(v) => update(i, "enabled", v)}
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => remove(i)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}

      <Button variant="outline" size="sm" onClick={add} className="mt-2">
        <Plus className="w-4 h-4 mr-1" /> Tambah Social Media
      </Button>
    </div>
  );
};

export default SocialMediaEditor;
