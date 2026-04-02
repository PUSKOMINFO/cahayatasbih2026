import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface KeyValueItem {
  label: string;
  value: string;
}

interface KeyValueTableEditorProps {
  items: KeyValueItem[];
  onChange: (items: KeyValueItem[]) => void;
  labelHeader?: string;
  valueHeader?: string;
}

const KeyValueTableEditor = ({
  items,
  onChange,
  labelHeader = "Label",
  valueHeader = "Value",
}: KeyValueTableEditorProps) => {
  const update = (index: number, field: "label" | "value", val: string) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: val };
    onChange(next);
  };

  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const add = () => {
    onChange([...items, { label: "", value: "" }]);
  };

  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="grid grid-cols-[40px_1fr_1fr_36px] gap-2 px-1 pb-1 border-b border-border">
        <span className="text-xs font-semibold text-muted-foreground">No</span>
        <span className="text-xs font-semibold text-muted-foreground">{labelHeader}</span>
        <span className="text-xs font-semibold text-muted-foreground">{valueHeader}</span>
        <span />
      </div>

      {items.map((item, i) => (
        <div key={i} className="grid grid-cols-[40px_1fr_1fr_36px] gap-2 items-center group">
          <span className="text-xs text-muted-foreground text-center">{i + 1}</span>
          <Input
            value={item.label}
            onChange={(e) => update(i, "label", e.target.value)}
            placeholder={labelHeader}
            className="h-9 text-sm"
          />
          <Input
            value={item.value}
            onChange={(e) => update(i, "value", e.target.value)}
            placeholder={valueHeader}
            className="h-9 text-sm"
          />
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => remove(i)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}

      <Button variant="outline" size="sm" onClick={add} className="mt-2">
        <Plus className="w-4 h-4 mr-1" /> Tambah Baris
      </Button>
    </div>
  );
};

export default KeyValueTableEditor;
