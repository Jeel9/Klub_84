import Button from "../../../app/components/Button";
import type { Payment } from "./types";

export default function PaymentTable({ payments, onBounce }: any) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Amount</th>
          <th>Mode</th>
          <th>Type</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {payments.map((p: Payment) => (
          <tr key={p.payment_id}>
            <td>{p.payment_id}</td>
            <td>₹ {p.amount}</td>
            <td>{p.payment_mode}</td>
            <td>{p.payment_type}</td>
            <td>{p.status}</td>
            <td>
              {p.status === "cleared" && p.payment_type === "normal" && (
                <Button variant="secondary" onClick={() => onBounce(p.payment_id)}>
                  Bounce
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}