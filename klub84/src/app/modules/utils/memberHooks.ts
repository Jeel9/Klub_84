import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import type { Member } from "./types";

export default function useMembers(companyId: number) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMembers = async () => {
    setLoading(true);
    const data = await invoke<Member[]>("get_members", {
      companyId,
    });
    setMembers(data);
    setLoading(false);
  };

  const createMember = async (member: Member) => {
    await invoke("create_member", { member });
    fetchMembers();
  };

  const updateMember = async (member: Member) => {
    await invoke("update_member", { member });
    fetchMembers();
  };

  const deactivateMember = async (memberId: string) => {
    await invoke("deactivate_member", {
      memberId,
    });
    fetchMembers();
  };

  useEffect(() => {
    fetchMembers();
  }, [companyId]);

  return {
    members,
    loading,
    createMember,
    updateMember,
    deactivateMember,
  };
}
