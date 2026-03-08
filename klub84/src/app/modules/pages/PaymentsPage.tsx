import PaymentTable from "../utils/PaymentTable";
import PaymentFormDrawer from "../utils/PaymentForm";
import MemberSelector from "../utils/MemberSelector";
import Button from "../../../app/components/Button";
import PurchaseSelector from "../utils/PurchaseSelector";
import { useState } from "react";
import {usePayments} from "../utils/paymentHooks";
import usePurchases from "../utils/purchaseHooks";
import MemberSearch from "../utils/MemberSelector";
import PaymentForm from "../utils/PaymentForm";
import useShareSchemes from "../utils/shareHooks";
import { useCompanyStore } from "../../store/companyStore";
import Table from "../../components/Table";

export default function PaymentsPage() {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [selectedPurchase, setSelectedPurchase] = useState<any>(null);
  const companyId = useCompanyStore().companyId;
  const { schemes } = useShareSchemes(companyId);
  const { purchases } = usePurchases(selectedMember?.member_id);
  const { payments, createPayment, bouncePayment } =
    usePayments(selectedPurchase?.purchase_id);

  return (
    <div >
      <h2 style={{ marginBottom: 8 }}>Payments</h2>

      {/* Member Selector */}
      <MemberSearch
        // companyId={companyId}
        onSelect={(member) => {
          setSelectedMember(member);
          setSelectedPurchase(null);
        }}
      />

      {/* Purchases List */}
      {selectedMember && (
        <div style={{ marginTop: 20 }}>
          <h3>Select Purchase</h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 10,
            }}
          >
            {purchases.map((p) => (
              <div
                key={p.purchase_id}
                onClick={() => setSelectedPurchase(p)}
                style={{
                  padding: 12,
                  borderRadius: 8,
                  border:
                    selectedPurchase?.purchase_id === p.purchase_id
                      ? "2px solid #2563eb"
                      : "1px solid #e5e7eb",
                  cursor: "pointer",
                  background: "white",
                }}
              >
                <strong>{schemes.find((s) => s.scheme_id === p.scheme_id)?.scheme_name}</strong> — Qty: {p.quantity} 
                 — Total: ₹ {p.total_amount} — Pending: ₹ {p.pending_amount} — Status: {p.status}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Form */}
      {selectedPurchase && (
        <PaymentForm
          purchase={selectedPurchase}
          onCreate={createPayment}
        />
      )}

      {/* Payments Table */}
      {selectedPurchase && (
        <div style={{ marginTop: 30 }}>
          <h3>Payment History</h3>

          <div style={{ overflowX: "auto" }}>
            <Table  headers={["ID", "Amount", "Mode", "Reference Number", "Status", "Actions"]}>
              {/* <thead>
                <tr>
                  <th>ID</th>
                  <th>Amount</th>
                  <th>Mode</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody> */}
                {payments.map((pay) => (
                  <tr key={pay.payment_id}>
                    <td>{pay.payment_id}</td>
                    <td>₹{pay.amount}</td>
                    <td>{pay.payment_mode}</td>
                    <td>{pay.reference_number}</td>
                    <td>{pay.status}</td>
                    <td style={{ display: "flex", gap: 8 }}>
                      {pay.payment_mode === "cheque" &&
                        pay.status !== "bounced" && (
                          <Button
                            variant="secondary"
                            onClick={() => bouncePayment(pay.payment_id)}
                          >
                            Bounce
                          </Button>
                        )}

                      {/* <button
                        onClick={() => deletePayment(pay.payment_id)}
                      >
                        Void
                      </button> */}
                    </td>
                  </tr>
                ))}
                </Table>
              {/* </tbody>
            </table> */}
          </div>
        </div>
      )}
    </div>
  );
}