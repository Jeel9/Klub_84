import { useState } from "react";
import MemberSearch from "../utils/MemberSelector";
import usePurchases from "../utils/purchaseHooks";
import useShareSchemes from "../utils/shareHooks";
import { useCompanyStore } from "../../store/companyStore";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import Button from "../../components/Button";

export default function PurchasesPage() {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [schemeId, setSchemeId] = useState("");
  const [qty, setQty] = useState(1);
  const [paid, setPaid] = useState(0);
  const companyId = useCompanyStore().companyId;
  const { purchases, createPurchase, sellShare } = usePurchases(
    selectedMember?.member_id
  );

  const { schemes } = useShareSchemes(companyId);

  return (
    <div >
      <h2 style={{ marginBottom: 8, marginTop: 16 }}>Share Purchases</h2>

      <MemberSearch
        onSelect={setSelectedMember}
      />

      {selectedMember && (
        <div
          style={{
            marginTop: 24,
            padding: 20,
            background: "white",
            borderRadius: 12,
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ marginBottom: 16 }}>
            {selectedMember.name}
          </h2>

          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <select
              value={schemeId}
              onChange={(e) => setSchemeId(e.target.value)}
              style={{
                padding: 10,
                borderRadius: 8,
                border: "1px solid #e5e7eb",
              }}
            >
              <option value="">Select Scheme</option>
              {schemes.map((s) => (
                <option key={s.scheme_id} value={s.scheme_id}>
                  {s.scheme_name} — ₹{s.face_value}
                </option>
              ))}
            </select>

            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              style={{
                width: 100,
                padding: 10,
                borderRadius: 8,
                border: "1px solid #e5e7eb",
              }}
            />

            <input
              type="number"
              min={0}
              value={paid}
              onChange={(e) => setPaid(Number(e.target.value))}
              style={{
                width: 100,
                padding: 10,
                borderRadius: 8,
                border: "1px solid #e5e7eb",
              }}
            />

            {/* <button
              style={{
                padding: "10px 16px",
                background: "#2563eb",
                color: "white",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
              }} */}
              <Button
              onClick={() =>
                createPurchase(
                  selectedMember.member_id,
                  companyId,
                  schemeId,
                  qty,
                  schemes.find((s) => s.scheme_id === schemeId)?.face_value || 0,
                  paid
                )
              }
            >
              Create Purchase
            </Button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <Table
                    headers={[
                      "Purchase ID",
                      "Scheme",
                      "QTY",
                      "Total Amount",
                      "Pending Amount",
                      "Status",
                      "Actions",
                    ]}
                  >
                    {purchases.map((p) => (
                      <tr key={p.purchase_id} className="table-row">
                        <td>{p.purchase_id}</td>
                        <td>{schemes.find((s) => s.scheme_id === p.scheme_id)?.scheme_name}</td>
                        <td>{p.quantity}</td>
                        <td>{p.total_amount}</td>
                        <td>{p.pending_amount}</td>
                        <td>
                          <Badge
                            type={
                              p.status === "active"
                                ? "success"
                                : "danger"
                            }
                          >
                            {p.status}
                          </Badge>
                        </td>
                        <td>
                          <Button onClick={() => sellShare(
                              p.purchase_id,
                              schemes.find((s) => s.scheme_id === p.scheme_id)?.face_value || 0,
                            )}>
                            Sell Share
                          </Button>
                        </td>
                        
                      </tr>
                    ))}
                  </Table>
          </div>
        </div>
      )}
    </div>
  );
}