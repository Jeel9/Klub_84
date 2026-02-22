import { useState, useEffect } from "react";
import Drawer from "../../../app/components/Drawer";
import Input from "../../../app/components/Input";
import Button from "../../../app/components/Button";
import type { ShareScheme } from "./types";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, value: number) => void;
  onUpdate: (id: string, value: number) => void;
  editing?: ShareScheme | null;
};

export default function SchemeFormDrawer({
  open,
  onClose,
  onCreate,
  onUpdate,
  editing,
}: Props) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (editing) {
      setName(editing.scheme_name);
      setValue(String(editing.face_value));
    } else {
      setName("");
      setValue("");
    }
  }, [editing]);

  const submit = () => {
    if (!value) return;

    if (editing) {
      onUpdate(editing.scheme_id, Number(value));
    } else {
      if (!name) return;
      onCreate(name, Number(value));
    }

    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <h2>{editing ? "Update Share Price" : "Create Scheme"}</h2>

      {!editing && (
        <Input
          label="Scheme Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <Input
        label="Share Value"
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div style={{ marginTop: 20 }}>
        <Button onClick={submit}>
          {editing ? "Update" : "Create"}
        </Button>
      </div>
    </Drawer>
  );
}