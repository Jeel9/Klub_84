import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import type {SharePurchase } from "./types";

export default function usePurchases(memberId: string | null) {
  const [purchases, setPurchases] = useState<SharePurchase[]>([]);

  const load = async () => {
    if (!memberId) return;
    const data = await invoke<SharePurchase[]>("get_member_share_purchases", {
      memberId,
    });
    setPurchases(data);
  };

  const createPurchase = async (payload: any) => {
    await invoke("create_share_purchase", payload);
    await load();
  };

  useEffect(() => {
    load();
  }, [memberId]);

  return { purchases, createPurchase };
}