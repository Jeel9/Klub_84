import { useState } from "react";
import MemberSelector from "../utils/MemberSelector";
import PurchaseFormDrawer from "../utils/PurchaseForm";
import usePurchases from "../utils/purchaseHooks";
import Button from "../../../app/components/Button";
import { useCompanyStore } from "../../store/companyStore";
import type { SharePurchase } from "../utils/types";

function PurchaseTable({ purchases }: { purchases: SharePurchase[] }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Purchase ID</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Paid</th>
          <th>Pending</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {purchases.map((p) => (
          <tr key={p.purchase_id}>
            <td>{p.purchase_id}</td>
            <td>{p.quantity}</td>
            <td>₹ {p.total_amount}</td>
            <td>₹ {p.paid_amount}</td>
            <td>₹ {p.pending_amount}</td>
            <td>{p.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function PurchasesPage() {
  const { companyId } = useCompanyStore();
  const [memberId, setMemberId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const { purchases, createPurchase } = usePurchases(memberId);

  return (
    <div>
      <div className="page-header">
        <h1>Purchases</h1>
        <MemberSelector onSelect={setMemberId} />
        {memberId && <Button onClick={() => setOpen(true)}>Buy Shares</Button>}
      </div>

      {memberId ? <PurchaseTable purchases={purchases} /> : <p>Select member</p>}

      <PurchaseFormDrawer
        open={open}
        onClose={() => setOpen(false)}
        memberId={memberId}
        companyId={companyId}
        onSave={createPurchase}
      />
    </div>
  );
}