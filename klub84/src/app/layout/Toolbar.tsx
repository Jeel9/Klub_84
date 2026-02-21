import { useState } from "react";
import Select from "../components/Select";

export default function Topbar() {
  const [company, setCompany] = useState("Klub84");

  return (
    <div className="topbar">
      <div>
        <Select
          label="company-switch"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          options={[
            { label: "Klub84", value: "Klub84" },
            { label: "Umiya", value: "Umiya" },
          ]}
        />
      </div>

      <div>Admin</div>
    </div>
  );
}
