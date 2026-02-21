import { useState } from "react";
import PaymentTable from "../utils/PaymentTable";
import PaymentFormDrawer from "../utils/PaymentForm";
import MemberSelector from "../utils/MemberSelector";
import usePayments from "../utils/paymentHooks";
import Button from "../../../app/components/Button";
import PurchaseSelector from "../utils/PurchaseSelector";

export default function PaymentsPage() {
  const [memberId, setMemberId] = useState<string | null>(null);
  const [purchaseId, setPurchaseId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const { payments, addPayment, bounce } = usePayments(purchaseId);

  return (
    <div>
      <h1>Payments</h1>

      <div className="page-header">
        <MemberSelector onSelect={setMemberId} />
        {memberId && <PurchaseSelector memberId={memberId} onSelect={setPurchaseId} />}
        {purchaseId && <Button onClick={() => setOpen(true)}>Add Installment</Button>}
      </div>

      {purchaseId ? (
        <PaymentTable payments={payments} onBounce={bounce} />
      ) : (
        <p>Select purchase</p>
      )}

      <PaymentFormDrawer
        open={open}
        onClose={() => setOpen(false)}
        purchaseId={purchaseId}
        memberId={memberId}
        onSave={addPayment}
      />
    </div>
  );
}