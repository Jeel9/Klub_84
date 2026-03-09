import { useState } from "react";
import useMembers from "../utils/memberHooks";
import MemberTable from "../utils/MemberTable";
import MemberFormDrawer from "../utils/MemberForm";
import MemberSearch from "../utils/MemberSearch";
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
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredMembers = searchQuery
          ? members.filter((m) =>
              `${m.member_id} ${m.name}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            )
          : members;

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
          marginBottom: 8,
        }}
      >
        <h2>Members</h2>
        <Button onClick={() => setOpen(true)}>
          + Add Member
        </Button>
      </div>

      <MemberSearch
        onSearch={(query) => {
          setSearchQuery(query);
        }}
      />
      {/* <MemberSearch
        onSelect={(member) => {
          setSelectedMember(member);
        }}
      /> */}

      {/* <MemberTable
        members={selectedMember ? [selectedMember] : members} */}
        

        <MemberTable
          members={filteredMembers}
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
