import { useState } from "react";
import Drawer from "../../../app/components/Drawer";
import Input from "../../../app/components/Input";
import Button from "../../../app/components/Button";

export default function PaymentFormDrawer({ open, onClose, purchaseId, memberId, onSave }: any) {
  const [amount, setAmount] = useState(0);
  const [mode, setMode] = useState("cash");
  const [ref, setRef] = useState("");

  const submit = async () => {
    await onSave({
      purchaseId,
      memberId,
      amount,
      paymentMode: mode,
      referenceNumber: ref || null,
    });
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <h2>Add Installment</h2>

      <Input label="Amount" type="number" value={amount.toString()} onChange={(e) => setAmount(Number(e.target.value))} />

      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="cash">Cash</option>
        <option value="upi">UPI</option>
        <option value="bank">Bank</option>
        <option value="cheque">Cheque</option>
      </select>

      <Input label="Reference" value={ref} onChange={(e) => setRef(e.target.value)} />

      <Button onClick={submit}>Save Payment</Button>
    </Drawer>
  );
}