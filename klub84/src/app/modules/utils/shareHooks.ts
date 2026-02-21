import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import type { ShareScheme } from "./types";

export default function useShareSchemes(companyId: number) {
  const [schemes, setSchemes] = useState<ShareScheme[]>([]);

  const load = async () => {
    const data = await invoke<ShareScheme[]>("get_company_share_schemes", {
      companyId,
    });
    setSchemes(data);
  };

  const createScheme = async (name: string, value: number) => {
    await invoke("create_share_scheme", {
      companyId,
      schemeName: name,
      faceValue: value,
    });
    await load();
  };

  const updatePrice = async (schemeId: string, newPrice: number) => {
    await invoke("update_share_price", {
      schemeId,
      newPrice,
    });
    await load();
  };

  const deactivate = async (schemeId: string) => {
    await invoke("deactivate_share_scheme", { schemeId });
    await load();
  };

  useEffect(() => {
    load();
  }, [companyId]);

  return { schemes, createScheme, updatePrice, deactivate };
}