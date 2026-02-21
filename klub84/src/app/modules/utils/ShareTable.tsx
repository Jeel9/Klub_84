import Table from "../../../app/components/Table";
import Badge from "../../../app/components/Badge";
import Button from "../../../app/components/Button";
import type { Share } from "./types";

type Props = {
  shares: Share[];
  onDeactivate: (id: string) => void;
};

export default function ShareTable({
  shares,
  onDeactivate,
}: Props) {
  return (
    <div style={{ overflowX: "auto" }}>
      <Table
        headers={[
          "Share ID",
          "Share No",
          "Qty",
          "Price",
          "Total",
          "Issued",
          "Status",
          "Actions",
        ]}
      >
        {shares.map((share) => (
          <tr key={share.share_id} className="table-row">
            <td>{share.share_id}</td>
            <td>{share.share_number}</td>
            <td>{share.quantity}</td>
            <td>{share.price_per_share}</td>
            <td>{share.total_amount}</td>
            <td>{share.issue_date}</td>
            <td>
              <Badge
                type={
                  share.status === "active"
                    ? "success"
                    : "danger"
                }
              >
                {share.status}
              </Badge>
            </td>
            <td>
              {share.status === "active" && (
                <Button
                  variant="secondary"
                  onClick={() =>
                    share.share_id &&
                    onDeactivate(share.share_id)
                  }
                >
                  Deactivate
                </Button>
              )}
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
