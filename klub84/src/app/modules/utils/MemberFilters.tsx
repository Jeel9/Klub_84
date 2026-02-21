import Input from "../../../app/components/Input";
import Select from "../../../app/components/Select";

export default function MemberFilters() {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        marginBottom: "20px",
      }}
    >
      <div style={{ width: 240 }}>
        <Input placeholder="Search by name or phone" />
      </div>

      <div style={{ width: 180 }}>
        <Select
          options={[
            { label: "All Status", value: "all" },
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
        />
      </div>
    </div>
  );
}
