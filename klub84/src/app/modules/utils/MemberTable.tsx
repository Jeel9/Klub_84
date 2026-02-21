import Table from "../../../app/components/Table";
import Badge from "../../../app/components/Badge";
import Button from "../../../app/components/Button";
import type { Member } from "./types";

type Props = {
  members: Member[];
  onEdit: (member: Member) => void;
  onDeactivate: (memberId: string) => void;
};

export default function MemberTable({
  members,
  onEdit,
  onDeactivate,
}: Props) {
  return (
    <div style={{ overflowX: "auto" }}>
      <Table
        headers={[
          "Member ID",
          "Name",
          "City",
          "Email",
          "Phone",
          "Updated",
          "Status",
          "Actions",
        ]}
      >
        {members.map((member) => (
          <tr key={member.member_id} className="table-row">
            <td>{member.member_id}</td>
            <td>{member.name}</td>
            <td>{member.city || "-"}</td>
            <td>{member.email || "-"}</td>
            <td>{member.phone || "-"}</td>
            <td>{member.update_date || "-"}</td>
            <td>
              <Badge
                type={
                  member.status === "active"
                    ? "success"
                    : "danger"
                }
              >
                {member.status}
              </Badge>
            </td>
            <td style={{ display: "flex", gap: 8 }}>
              <Button
                variant="secondary"
                onClick={() => onEdit(member)}
              >
                Edit
              </Button>

              {member.status === "active" && (
                <Button
                  variant="secondary"
                  onClick={() =>
                    onDeactivate(member.member_id)
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