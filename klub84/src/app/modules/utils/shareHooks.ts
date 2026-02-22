import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import type { ShareScheme } from "./types";

export default function useShareSchemes(companyId: number) {
  const [schemes, setSchemes] = useState<ShareScheme[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!companyId) return;
    setLoading(true);

    const data = await invoke<ShareScheme[]>("get_company_share_schemes", {
      companyId: companyId, // <-- camelCase REQUIRED
    });

    setSchemes(data);
    setLoading(false);
  };

  const createScheme = async (name: string, value: number) => {
    await invoke("create_share_scheme", {
      shareScheme: {
        company_id: companyId,
        scheme_name: name,
        face_value: value,
      },
    });

    await load();
  };

  const updatePrice = async (schemeId: string, newPrice: number) => {
    await invoke("update_share_price", {
        schemeId: schemeId,
        newPrice: newPrice,
    });

    await load();
  };

  const deactivate = async (schemeId: string) => {
    await invoke("deactivate_share_scheme", {
      scheme_id: schemeId,
    });

    await load();
  };

  useEffect(() => {
    load();
  }, [companyId]);

  return { schemes, loading, createScheme, updatePrice, deactivate };
}