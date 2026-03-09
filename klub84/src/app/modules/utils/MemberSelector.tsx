import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useCompanyStore } from "../../store/companyStore";
type Member = { member_id: string; name: string };

export default function MemberSelector({
  onSelect,
}: {
  // companyId: number;
  onSelect: (id: string) => void;
}) {
  const [members, setMembers] = useState<Member[]>([]);
  const [query, setQuery] = useState("");
  const { companyId } = useCompanyStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    invoke<Member[]>("get_members", { companyId: companyId }).then(setMembers);
  }, [companyId]);
  const filtered = members.filter((m) =>
    `${m.member_id} ${m.name}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const handleSelect = (member: any) => {
    setQuery(`${member.member_id} - ${member.name}`);
    setOpen(false);
    onSelect(member);
  };

  return (
    <div style={{ position: "relative", width: 320 }}>
      <input
        value={query}
        placeholder="Search member..."
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 8,
          border: "1px solid #e5e7eb",
        }}
      />

      {open && query && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            marginTop: 4,
            maxHeight: 200,
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          {filtered.length === 0 && (
            <div style={{ padding: 10, color: "#6b7280" }}>
              No results
            </div>
          )}

          {filtered.map((m) => (
            <div
              key={m.member_id}
              onClick={() => handleSelect(m)}
              style={{
                padding: 10,
                cursor: "pointer",
                borderBottom: "1px solid #f3f4f6",
              }}
            >
              <strong>{m.member_id}</strong> — {m.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}