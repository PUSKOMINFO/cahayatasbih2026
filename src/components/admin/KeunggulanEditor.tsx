import { Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface KeunggulanEditorProps {
  items: string[];
  onChange: (items: string[]) => void;
}

const KeunggulanEditor = ({ items, onChange }: KeunggulanEditorProps) => {
  const update = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const add = () => {
    onChange([...items, ""]);
  };

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 group">
          <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-xs text-muted-foreground w-6 text-right">{i + 1}.</span>
          <Input
            value={item}
            onChange={(e) => update(i, e.target.value)}
            placeholder="Keunggulan..."
            className="flex-1 h-10"
          />
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => remove(i)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={add} className="mt-2">
        <Plus className="w-4 h-4 mr-1" /> Tambah Keunggulan
      </Button>
    </div>
  );
};

export default KeunggulanEditor;
