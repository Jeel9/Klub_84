import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import type { SharePurchase } from "./types";

export default function usePurchases(memberId?: string) {
  const [purchases, setPurchases] = useState<SharePurchase[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!memberId) return;
    setLoading(true);

    const data: any[] = await invoke<SharePurchase[]>("get_member_purchases", { memberId });

    const mapped: SharePurchase[] = data.map((p) => ({
      purchaseId: p.purchase_id,
      memberId: p.member_id,
      companyId: p.company_id,
      schemeId: p.scheme_id,
      schemeName: p.scheme_name,
      quantity: p.quantity,
      sharePrice: p.share_price,
      totalAmount: p.total_amount,
      paidAmount: p.paid_amount,
      pendingAmount: p.pending_amount,
      status: p.status,
      createdAt: p.created_at,
      certificateNumber: p.certificate_number,
    }));

    setPurchases(mapped);
    setLoading(false);
  };

  const createPurchase = async (
    memberId: string,
    companyId: number,
    schemeId: string,
    quantity: number,
    sharePrice: number,
    paidAmount: number,
    certiNumber: string
  ) => {
    if (!memberId) return;

    await invoke("create_share_purchase", {
      memberId,
      companyId,
      schemeId,
      quantity,
      pricePerShare: sharePrice,
      firstPayment: paidAmount,
      certificateNumber: certiNumber,
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