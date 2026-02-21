import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

type Purchase = { purchase_id: string; pending_amount: number };

export default function PurchaseSelector({ memberId, onSelect }: any) {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    if (!memberId) return;
    invoke<Purchase[]>("get_member_share_purchases", { memberId }).then(setPurchases);
  }, [memberId]);

  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option>Select Purchase</option>
      {purchases.map((p) => (
        <option key={p.purchase_id} value={p.purchase_id}>
          {p.purchase_id} (Pending ₹{p.pending_amount})
        </option>
      ))}
    </select>
  );
}