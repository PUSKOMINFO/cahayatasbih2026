import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSiteContent = (section: string, key: string) => {
  return useQuery({
    queryKey: ["site_content", section, key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("value")
        .eq("section", section)
        .eq("key", key)
        .maybeSingle();
      if (error) throw error;
      return data?.value ?? null;
    },
  });
};

export const useSiteContentBySection = (section: string) => {
  return useQuery({
    queryKey: ["site_content", section],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("section", section);
      if (error) throw error;
      return data ?? [];
    },
  });
};

export const useAllSiteContent = () => {
  return useQuery({
    queryKey: ["site_content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("section")
        .order("key");
      if (error) throw error;
      return data ?? [];
    },
  });
};

export const useUpdateSiteContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      section,
      key,
      value,
    }: {
      section: string;
      key: string;
      value: unknown;
    }) => {
      const { error } = await supabase
        .from("site_content")
        .upsert({ section, key, value: value as any }, { onConflict: "section,key" });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site_content"] });
    },
  });
};
