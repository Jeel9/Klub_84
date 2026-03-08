import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import type { SharePurchase } from "./types";

export default function usePurchases(memberId?: string) {
  const [purchases, setPurchases] = useState<SharePurchase[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!memberId) return;
    setLoading(true);

    const data = await invoke<SharePurchase[]>("get_member_purchases", {memberId});

    setPurchases(data);
    console.log("Loaded purchases:", data);
    setLoading(false);
  };

  const createPurchase = async (
    memberId: string,
    companyId: number,
    schemeId: string,
    quantity: number,
    sharePrice: number,
    paidAmount: number,
  ) => {
    if (!memberId) return;

    await invoke("create_share_purchase", {
      memberId,
      companyId,
      schemeId,
      quantity,
      pricePerShare: sharePrice,
      firstPayment: paidAmount,
    });

    await load();
  };

  useEffect(() => {
    load();
  }, [memberId]);

  const sellShare = async (
    purchaseId: string,
    price: number
  ) => {
    await invoke("sell_share", {
      purchaseId,
      currentPrice: price,
    });
    console.log(price);
    await load();
  };

  return { purchases, loading, createPurchase, sellShare, reload: load };
}