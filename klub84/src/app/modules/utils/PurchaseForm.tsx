import { useEffect, useState } from "react";
import Drawer from "../../../app/components/Drawer";
import Input from "../../../app/components/Input";
import Button from "../../../app/components/Button";
import { invoke } from "@tauri-apps/api/core";

export default function PurchaseFormDrawer({ open, onClose, memberId, companyId, onSave }: any) {
  const [schemes, setSchemes] = useState<any[]>([]);
  const [schemeId, setSchemeId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [payment, setPayment] = useState(0);

  useEffect(() => {
    if (!open) return;
    invoke<any[]>("get_company_share_schemes", { companyId }).then(setSchemes);
  }, [open]);

  useEffect(() => {
    const s = schemes.find((x) => x.scheme_id === schemeId);
    if (s) setPrice(s.face_value);
  }, [schemeId]);

  const total = quantity * price;

  const submit = async () => {
    await onSave({
      memberId,
      companyId,
      schemeId,
      quantity,
      pricePerShare: price,
      firstPayment: payment,
    });
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <h2>Buy Shares</h2>

      <select onChange={(e) => setSchemeId(e.target.value)}>
        <option>Select Scheme</option>
        {schemes.map((s) => (
          <option key={s.scheme_id} value={s.scheme_id}>
            {s.scheme_name} - ₹{s.face_value}
          </option>
        ))}
      </select>

      <Input label="Quantity" type="number" value={quantity.toString()} onChange={(e) => setQuantity(Number(e.target.value))} />
      <Input label="Price" value={price.toString()} />
      <Input label="Total" value={total.toString()} />
      <Input label="First Payment" type="number" value={payment.toString()} onChange={(e) => setPayment(Number(e.target.value))} />

      <Button onClick={submit}>Create Purchase</Button>
    </Drawer>
  );
}