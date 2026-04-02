import { Plus, Trash2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import KeyValueTableEditor from "./KeyValueTableEditor";

interface SchoolData {
  no: number;
  nama: string;
  color: string;
  data: { label: string; value: string }[];
  growth: string;
  growthPercent: string;
}

interface PendidikanFormalEditorProps {
  schools: SchoolData[];
  onChange: (schools: SchoolData[]) => void;
}

const PendidikanFormalEditor = ({ schools, onChange }: PendidikanFormalEditorProps) => {
  const updateField = (index: number, field: keyof SchoolData, val: any) => {
    const next = [...schools];
    next[index] = { ...next[index], [field]: val };
    onChange(next);
  };

  const remove = (index: number) => {
    onChange(schools.filter((_, i) => i !== index).map((s, i) => ({ ...s, no: i + 1 })));
  };

  const add = () => {
    onChange([...schools, {
      no: schools.length + 1,
      nama: "",
      color: "primary",
      data: [],
      growth: "",
      growthPercent: "",
    }]);
  };

  return (
    <div className="space-y-6">
      {schools.map((school, i) => (
        <div key={i} className="border border-border rounded-xl overflow-hidden">
          {/* School Header */}
          <div className="bg-secondary/50 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-foreground">Sekolah {school.no}</span>
            </div>
            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => remove(i)}>
              <Trash2 className="w-4 h-4 mr-1" /> Hapus
            </Button>
          </div>

          <div className="p-4 space-y-4">
            {/* Basic fields */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Nama Sekolah</label>
                <Input value={school.nama} onChange={(e) => updateField(i, "nama", e.target.value)} className="h-9" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Warna (primary / accent)</label>
                <Input value={school.color} onChange={(e) => updateField(i, "color", e.target.value)} className="h-9" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Pertumbuhan Siswa</label>
                <Input value={school.growth} onChange={(e) => updateField(i, "growth", e.target.value)} className="h-9" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Persentase Growth</label>
                <Input value={school.growthPercent} onChange={(e) => updateField(i, "growthPercent", e.target.value)} className="h-9" />
              </div>
            </div>

            {/* Data table */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Data Detail</label>
              <KeyValueTableEditor
                items={school.data || []}
                onChange={(data) => updateField(i, "data", data)}
                labelHeader="Label"
                valueHeader="Nilai"
              />
            </div>
          </div>
        </div>
      ))}

      <Button variant="outline" onClick={add}>
        <Plus className="w-4 h-4 mr-1" /> Tambah Sekolah
      </Button>
    </div>
  );
};

export default PendidikanFormalEditor;
