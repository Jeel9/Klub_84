import { useState } from "react";
import useMembers from "../utils/memberHooks";
import MemberTable from "../utils/MemberTable";
import MemberFormDrawer from "../utils/MemberForm";
import MemberFilters from "../utils/MemberFilters";
import Button from "../../../app/components/Button";
import { useCompanyStore } from "../../store/companyStore";

export default function MembersPage() {
  const { companyId } = useCompanyStore();
  const {
    members,
    createMember,
    updateMember,
    deactivateMember,
  } = useMembers(companyId);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const handleSubmit = async (formData: any) => {
    if (editing) {
      await updateMember({
        ...editing,
        ...formData,
      });
    } else {
      await createMember({
        ...formData,
        company_id: companyId,
        status: "active",
      });
    }

    setOpen(false);
    setEditing(null);
  };
  
  const handleEdit = (member: any) => {
    setEditing(member);
    setOpen(true);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <h1>Members</h1>
        <Button onClick={() => setOpen(true)}>
          + Add Member
        </Button>
      </div>

      <MemberFilters />

      <MemberTable
        members={members}
        onEdit={handleEdit}
        onDeactivate={deactivateMember}
      />

      <MemberFormDrawer
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        editingMember={editing}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
