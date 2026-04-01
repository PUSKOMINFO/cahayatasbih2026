import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2, Plus, GripVertical } from "lucide-react";

interface HeroImagesEditorProps {
  images: string[];
  onChange: (images: string[]) => void;
}

const HeroImagesEditor = ({ images, onChange }: HeroImagesEditorProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `hero/${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from("site-images").upload(path, file, { upsert: true });

    if (error) {
      toast({ title: "Gagal upload", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("site-images").getPublicUrl(path);
    onChange([...images, urlData.publicUrl]);
    setUploading(false);
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-foreground">Gambar Hero Slider</label>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((url, index) => (
          <div key={index} className="relative group aspect-video rounded-xl overflow-hidden border border-border">
            <img src={url} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="w-8 h-8 bg-destructive text-white rounded-full flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <span className="absolute top-2 left-2 text-xs bg-black/60 text-white px-2 py-0.5 rounded-full">
              {index + 1}
            </span>
          </div>
        ))}

        {/* Add button */}
        <label className="aspect-video rounded-xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center cursor-pointer transition-colors">
          {uploading ? (
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          ) : (
            <>
              <Plus className="w-6 h-6 text-muted-foreground mb-1" />
              <span className="text-xs text-muted-foreground">Tambah</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={handleUpload}
          />
        </label>
      </div>
    </div>
  );
};

export default HeroImagesEditor;
