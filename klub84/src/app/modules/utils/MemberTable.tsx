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
          "Image",
          "ID",
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
            <td>{member.profile_image ? (
                <img
                  src={member.profile_image}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 6
                  }}
                />
              ) : (
                "-"
              )}
            </td>
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
            <td >
              <div style={{ display: "flex", gap: 8}}>

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
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}