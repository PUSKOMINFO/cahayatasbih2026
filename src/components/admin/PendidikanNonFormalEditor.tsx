import { Input } from "@/components/ui/input";
import KeyValueTableEditor from "./KeyValueTableEditor";

interface NonFormalData {
  nama: string;
  data: { label: string; value: string }[];
  ketuaYayasan?: { label: string; nama: string };
}

interface PendidikanNonFormalEditorProps {
  value: NonFormalData;
  onChange: (value: NonFormalData) => void;
}

const PendidikanNonFormalEditor = ({ value, onChange }: PendidikanNonFormalEditorProps) => {
  const update = (field: string, val: any) => {
    onChange({ ...value, [field]: val });
  };

  return (
    <div className="space-y-5">
      {/* Nama */}
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Nama Lembaga</label>
        <Input value={value.nama || ""} onChange={(e) => update("nama", e.target.value)} className="h-10" />
      </div>

      {/* Data table */}
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-2 block">Data Detail</label>
        <KeyValueTableEditor
          items={value.data || []}
          onChange={(data) => update("data", data)}
          labelHeader="Label"
          valueHeader="Nilai"
        />
      </div>

      {/* Ketua Yayasan */}
      <div className="border-t border-border pt-4">
        <label className="text-xs font-medium text-muted-foreground mb-2 block">Ketua Yayasan</label>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Jabatan / Label</label>
            <Input
              value={value.ketuaYayasan?.label || ""}
              onChange={(e) => update("ketuaYayasan", { ...value.ketuaYayasan, label: e.target.value })}
              className="h-9"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Nama</label>
            <Input
              value={value.ketuaYayasan?.nama || ""}
              onChange={(e) => update("ketuaYayasan", { ...value.ketuaYayasan, nama: e.target.value })}
              className="h-9"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendidikanNonFormalEditor;
