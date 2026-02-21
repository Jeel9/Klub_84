import { useState } from "react";
import Drawer from "../../../app/components/Drawer";
import Input from "../../../app/components/Input";
import Button from "../../../app/components/Button";
import Select from "../../../app/components/Select";
import type { Member } from "./types";

type Props = {
  open: boolean;
  onClose: () => void;
  editingMember?: Member | null;
  onSubmit: (data: any) => void;
};

export default function MemberFormDrawer({
  open,
  onClose,
  editingMember,
  onSubmit,
}: Props) {
  const [form, setForm] = useState({
    name: editingMember?.name || "",
    city: editingMember?.city || "",
    address: editingMember?.address || "",
    phone: editingMember?.phone || "",
    aadhar: editingMember?.aadhar || "",
    pan_number: editingMember?.pan_number || "",
    business: editingMember?.business || "",
    business_address: editingMember?.business_address || "",
    email: editingMember?.email || "",
    gender: editingMember?.gender || "",
    dob: editingMember?.dob || "",
    family_member1: editingMember?.family_member1 || "",
    family_member2: editingMember?.family_member2 || "",
    family_member3: editingMember?.family_member3 || "",
    family_member4: editingMember?.family_member4 || "",
});

  const handleChange = (
    field: string,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(form);
  };


  return (
    <Drawer open={open} onClose={onClose}>
      <h2 style={{ marginBottom: 20 }}>
        {editingMember ? "Edit Member" : "Add Member"}
      </h2>

      {/* BASIC INFO */}
      <Input
        label="Full Name *"
        value={form.name}
        onChange={(e) =>
          handleChange("name", e.target.value)
        }
      />

      <Input
        label="City"
        value={form.city}
        onChange={(e) =>
          handleChange("city", e.target.value)
        }
      />

      <Input
        label="Address"
        value={form.address}
        onChange={(e) =>
          handleChange("address", e.target.value)
        }
      />

      <Input
        label="Phone"
        value={form.phone}
        onChange={(e) =>
          handleChange("phone", e.target.value)
        }
      />

      <Input
        label="Email"
        value={form.email}
        onChange={(e) =>
          handleChange("email", e.target.value)
        }
      />

      {/* IDENTITY */}
      <Input
        label="Aadhar"
        value={form.aadhar}
        onChange={(e) =>
          handleChange("aadhar", e.target.value)
        }
      />

      <Input
        label="PAN Number"
        value={form.pan_number}
        onChange={(e) =>
          handleChange("pan_number", e.target.value)
        }
      />

      {/* BUSINESS */}
      <Input
        label="Business"
        value={form.business}
        onChange={(e) =>
          handleChange("business", e.target.value)
        }
      />

      <Input
        label="Business Address"
        value={form.business_address}
        onChange={(e) =>
          handleChange("business_address", e.target.value)
        }
      />

      {/* PERSONAL */}
      <Select
        label="Gender"
        value={form.gender}
        onChange={(e) =>
          handleChange("gender", e.target.value)
        }
        options={[
          { label: "Select Gender", value: "" },
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
        ]}
      />

      <Input
        label="Date of Birth"
        type="date"
        value={form.dob}
        onChange={(e) =>
          handleChange("dob", e.target.value)
        }
      />

      {/* FAMILY */}
      <Input
        label="Family Member 1"
        value={form.family_member1}
        onChange={(e) =>
          handleChange("family_member1", e.target.value)
        }
      />

      <Input
        label="Family Member 2"
        value={form.family_member2}
        onChange={(e) =>
          handleChange("family_member2", e.target.value)
        }
      />

      <Input
        label="Family Member 3"
        value={form.family_member3}
        onChange={(e) =>
          handleChange("family_member3", e.target.value)
        }
      />

      <Input
        label="Family Member 4"
        value={form.family_member4}
        onChange={(e) =>
          handleChange("family_member4", e.target.value)
        }
      />

      {/* STATUS */}
      {/* <Select
        label="Status"
        value={form.status}
        onChange={(e) =>
          handleChange("status", e.target.value)
        }
        options={[
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ]}
      /> */}

      {/* ACTIONS */}
      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <Button onClick={handleSubmit}>
          Save Member
        </Button>
        <Button
          variant="secondary"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </Drawer>
  );
}
