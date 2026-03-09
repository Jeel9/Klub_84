import Select from "../components/Select";
import { useCompanyStore } from "../store/companyStore";

export default function Topbar() {
  const { companyId, setCompanyId } = useCompanyStore();

  return (
    <div className="topbar">
      <div>
        <Select
          label="company-switch"
          value={companyId}
          onChange={(e) => setCompanyId(Number(e.target.value))}
          options={[
            { label: "Klub84", value: 1 },
            { label: "Umiya", value: 2 },
          ]}
        />
      </div>

      <div>Admin</div>
    </div>
  );
}
