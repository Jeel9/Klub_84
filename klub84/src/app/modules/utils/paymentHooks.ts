import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import type { Payment } from "./types";

export default function usePayments(purchaseId: string | null) {
  const [payments, setPayments] = useState<Payment[]>([]);

  const load = async () => {
    if (!purchaseId) return;
    const data = await invoke<Payment[]>("get_purchase_payments", { purchaseId });
    setPayments(data);
  };

  const addPayment = async (payload: any) => {
    await invoke("add_purchase_payment", payload);
    await load();
  };

  const bounce = async (paymentId: string) => {
    await invoke("bounce_payment", { paymentId });
    await load();
  };

  useEffect(() => {
    load();
  }, [purchaseId]);

  return { payments, addPayment, bounce };
}