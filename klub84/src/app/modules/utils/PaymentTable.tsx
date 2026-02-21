import Table from "../../../app/components/Table";
import Badge from "../../../app/components/Badge";
import Button from "../../../app/components/Button";
import type { Payment } from "./types";

type Props = {
  payments: Payment[];
  onVoid: (id: string) => void;
};

export default function PaymentTable({
  payments,
  onVoid,
}: Props) {
  return (
    <div style={{ overflowX: "auto" }}>
      <Table
        headers={[
          "Payment ID",
          "Amount",
          "Mode",
          "Reference",
          "Type",
          "Status",
          "Date",
          "Actions",
        ]}
      >
        {payments.map((payment) => (
          <tr key={payment.payment_id}>
            <td>{payment.payment_id}</td>
            <td>{payment.amount}</td>
            <td>{payment.payment_mode}</td>
            <td>{payment.reference_number || "-"}</td>
            <td>{payment.payment_type}</td>
            <td>
              <Badge
                type={
                  payment.status === "cleared"
                    ? "success"
                    : "danger"
                }
              >
                {payment.status}
              </Badge>
            </td>
            <td>{payment.created_at}</td>
            <td>
              {payment.status !== "void" && (
                <Button
                  variant="secondary"
                  onClick={() =>
                    payment.payment_id &&
                    onVoid(payment.payment_id)
                  }
                >
                  Void
                </Button>
              )}
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
