import { useState } from "react";
import useShareSchemes from "../utils/shareHooks";
import SchemeTable from "../utils/ShareTable";
import SchemeFormDrawer from "../utils/ShareDrawer";
import Button from "../../../app/components/Button";
import { useCompanyStore } from "../../store/companyStore";
import type { ShareScheme } from "../utils/types";

export default function SharesPage() {
  const { companyId } = useCompanyStore();
  const { schemes, createScheme, updatePrice, deactivate } = useShareSchemes(companyId);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ShareScheme | null>(null);

  return (
    <div>
      <div className="page-header">
        <h1>Shares</h1>
        <Button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          + Add Scheme
        </Button>
      </div>

      <SchemeTable
        schemes={schemes}
        onEdit={(s) => {
          setEditing(s);
          setOpen(true);
        }}
        onDeactivate={deactivate}
      />

      <SchemeFormDrawer
        open={open}
        onClose={() => setOpen(false)}
        onCreate={createScheme}
        onUpdate={updatePrice}
        editing={editing}
      />
    </div>
  );
}