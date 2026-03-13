import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import type { Payment } from "./types";

export function usePayments(purchaseId?: string) {
  const [payments, setPayments] = useState<Payment[]>([]);

  const load = async () => {
    console.log("calling payments:");

    if (!purchaseId) return;
    const data = await invoke<Payment[]>("get_purchase_payments", { purchaseId });
    console.log("Loaded payments:", data);
    setPayments(data);
  };

  useEffect(() => {
    load();
  }, [purchaseId]);

  const createPayment = async (
    purchaseId: string,
    memberId: string,
    amount: number,
    paymentMode: string,
    referenceNumber?: string
  ) => {
    if (!purchaseId) return;

    await invoke("add_purchase_payment", {
        purchaseId: purchaseId,
        memberId: memberId,
        amount,
        paymentMode,
        referenceNumber: referenceNumber || null,
      },
    );

    await load();
  };

  const bouncePayment = async (paymentId: string) => {
    await invoke("bounce_payment", { paymentId: paymentId });
    await load();
  };

  // const deletePayment = async (paymentId: string) => {
  //   await invoke("void_payment", { paymentId });
  //   await load();
  // };

  return { payments, createPayment, bouncePayment,  /* deletePayment, */ reload: load };
}