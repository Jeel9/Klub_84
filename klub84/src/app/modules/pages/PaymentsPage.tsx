import { useState } from "react";
import PaymentTable from "../utils/PaymentTable";
import PaymentFormDrawer from "../utils/PaymentForm";
import MemberSelector from "../utils/MemberSelector";
import usePayments from "../utils/paymentHooks";
import Button from "../../../app/components/Button";
import { useCompanyStore } from "../../store/companyStore";

export default function PaymentsPage() {
  const { companyId } = useCompanyStore();
  const [memberId, setMemberId] = useState("");

  const { payments, createPayment, voidPayment } =
    usePayments(memberId);

  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", gap: 20 }}>
          <h1>Payments</h1>
          <MemberSelector
            companyId={companyId}
            onSelect={setMemberId}
          />
        </div>

        {memberId && (
          <Button onClick={() => setOpen(true)}>
            + Add Payment
          </Button>
        )}
      </div>

      {/* Table */}
      {memberId ? (
        <PaymentTable
          payments={payments}
          onVoid={voidPayment}
        />
      ) : (
        <p>Select a member to view payments</p>
      )}

      {/* Drawer */}
      <PaymentFormDrawer
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={createPayment}
        memberId={memberId}
        companyId={companyId}
      />
    </div>
  );
}
