import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import type { Payment } from "./types";

export default function usePayments(memberId?: string) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPayments = async () => {
    if (!memberId) return;

    setLoading(true);
    const data = await invoke<Payment[]>(
      "get_payments_by_member",
      { member_id: memberId }
    );
    setPayments(data);
    setLoading(false);
  };

  const createPayment = async (payment: Payment) => {
    await invoke("create_payment", { payment });
    fetchPayments();
  };

  const voidPayment = async (paymentId: string) => {
    await invoke("void_payment", {
      payment_id: paymentId,
    });
    fetchPayments();
  };

  useEffect(() => {
    fetchPayments();
  }, [memberId]);

  return {
    payments,
    loading,
    createPayment,
    voidPayment,
  };
}
