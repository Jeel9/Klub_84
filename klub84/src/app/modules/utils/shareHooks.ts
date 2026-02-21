import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import type { Share } from "./types";

export default function useShares(memberId?: string) {
  const [shares, setShares] = useState<Share[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchShares = async () => {
    if (!memberId) return;
    setLoading(true);

    const data = await invoke<Share[]>(
      "get_shares_by_member",
      { member_id: memberId }
    );

    setShares(data);
    setLoading(false);
  };

  const createShare = async (share: Share) => {
    await invoke("create_share", { share });
    fetchShares();
  };

  const deactivateShare = async (shareId: string) => {
    await invoke("deactivate_share", {
      share_id: shareId,
    });
    fetchShares();
  };

  useEffect(() => {
    fetchShares();
  }, [memberId]);

  return {
    shares,
    loading,
    createShare,
    deactivateShare,
  };
}
