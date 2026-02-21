import { useState, useEffect } from "react";
import Drawer from "../../../app/components/Drawer";
import Input from "../../../app/components/Input";
import Select from "../../../app/components/Select";
import Button from "../../../app/components/Button";
import type { Payment } from "./types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Payment) => void;
  memberId: string;
  companyId: number;
};

export default function PaymentFormDrawer({
  open,
  onClose,
  onSubmit,
  memberId,
  companyId,
}: Props) {
  const [form, setForm] = useState({
    amount: "",
    payment_mode: "cash",
    reference_number: "",
    notes: "",
    company_id: companyId,
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      company_id: companyId,
    }));
  }, [companyId]);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit({
      company_id: Number(form.company_id),
      member_id: memberId,
      amount: Number(form.amount),
      payment_mode: form.payment_mode,
      reference_number: form.reference_number,
      payment_type: "normal",
      status: "cleared",
      notes: form.notes,
    });

    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <h2 style={{ marginBottom: 20 }}>Record Payment</h2>

      <Input label="Member ID" value={memberId} />

      <Select
        label="Share Type"
        value={String(form.company_id)}
        onChange={(e) =>
          handleChange("company_id", e.target.value)
        }
        options={[
          { label: "Klub84 Share", value: "1" },
          { label: "Umiya Share", value: "2" },
        ]}
      />

      <Input
        label="Amount"
        type="number"
        value={form.amount}
        onChange={(e) =>
          handleChange("amount", e.target.value)
        }
      />

      <Select
        label="Payment Mode"
        value={form.payment_mode}
        onChange={(e) =>
          handleChange("payment_mode", e.target.value)
        }
        options={[
          { label: "Cash", value: "cash" },
          { label: "UPI", value: "upi" },
          { label: "Bank Transfer", value: "bank" },
          { label: "Cheque", value: "cheque" },
        ]}
      />

      <Input
        label="Reference Number"
        value={form.reference_number}
        onChange={(e) =>
          handleChange("reference_number", e.target.value)
        }
      />

      <Input
        label="Notes"
        value={form.notes}
        onChange={(e) =>
          handleChange("notes", e.target.value)
        }
      />

      <div style={{ marginTop: 20 }}>
        <Button onClick={handleSubmit}>
          Save Payment
        </Button>
      </div>
    </Drawer>
  );
}
