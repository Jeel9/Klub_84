import { useState } from "react";
import MemberSelector from "../utils/MemberSelector";
import usePurchases from "../utils/purchaseHooks";
import useShareSchemes from "../utils/shareHooks";
import { useCompanyStore } from "../../store/companyStore";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Input from "../../components/Input";

export default function PurchasesPage() {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [schemeId, setSchemeId] = useState("");
  const [qty, setQty] = useState<number>(0);
  const [paid, setPaid] = useState<number>(0);
  const [certificateNumber, setCertificateNumber] = useState("");
  const companyId = useCompanyStore().companyId;
  const { purchases, createPurchase, sellShare } = usePurchases(
    selectedMember?.member_id
  );

  const { schemes } = useShareSchemes(companyId);

  return (
    <div >
      <h2 style={{ marginBottom: 8, marginTop: 16 }}>Share Purchases</h2>

      <MemberSelector
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

            <Input
              type="number"
              value={qty.toString()}
              onChange={(e) => setQty(Number(e.target.value))}
              label="Quantity"
            />

            <Input
              type="number"
              value={paid.toString()}
              onChange={(e) => setPaid(Number(e.target.value))}
              label="First Payment"
            />

            <Input
              type="number"
              value={certificateNumber}
              onChange={(e) => setCertificateNumber(e.target.value)}
              label="Certificate Number"
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
                  paid,
                  certificateNumber
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
                      "Certificate Number",
                      "Scheme",
                      "QTY",
                      "Total Amount",
                      "Pending Amount",
                      "Status",
                      "Actions",
                    ]}
                  >
                    {purchases.map((p) => (
                      <tr key={p.purchaseId} className="table-row">
                        <td>{p.purchaseId}</td>
                        <td>{p.certificateNumber}</td>
                        <td>{schemes.find((s) => s.scheme_id === p.schemeId)?.scheme_name}</td>
                        <td>{p.quantity}</td>
                        <td>{p.totalAmount}</td>
                        <td>{p.pendingAmount}</td>
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
                              p.purchaseId,
                              schemes.find((s) => s.scheme_id === p.schemeId)?.face_value || 0,
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