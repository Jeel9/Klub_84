import { useState } from "react";

export default function PaymentForm({
  purchase,
  onCreate,
}: {
  purchase: any;
  onCreate: (
    purchaseId: string,
    memberId: string,
    amount: number,
    mode: string,
    reference?: string
  ) => void;
}) {
  const [amount, setAmount] = useState(0);
  const [mode, setMode] = useState("cash");
  const [reference, setReference] = useState("");

  return (
    <div
      style={{
        marginTop: 24,
        padding: 20,
        background: "white",
        borderRadius: 12,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ marginBottom: 16 }}>
        Add Payment — Pending ₹{purchase.pending_amount}
      </h3>

      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #e5e7eb",
          }}
        />

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #e5e7eb",
          }}
        >
          <option value="cash">Cash</option>
          <option value="upi">UPI</option>
          <option value="cheque">Cheque</option>
        </select>

        {mode !== "cash" && (
          <input
            placeholder="Reference Number"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            style={{
              padding: 10,
              borderRadius: 8,
              border: "1px solid #e5e7eb",
            }}
          />
        )}

        <button
          style={{
            padding: "10px 16px",
            background: "#2563eb",
            color: "white",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => {
            if (!amount) return;
            onCreate(purchase.purchase_id, purchase.member_id ,amount, mode, reference);
            setAmount(0);
            setReference("");
          }}
        >
          Add Payment
        </button>
      </div>
    </div>
  );
}