// import { useEffect, useState } from "react";
// import { invoke } from "@tauri-apps/api/core";
// import type { Member } from "./types";

// export default function useMembers(companyId: number) {
//   const [members, setMembers] = useState<Member[]>([]);
//   const [loading, setLoading] = useState(false);

//   const fetchMembers = async () => {
//     setLoading(true);
//     const data = await invoke<Member[]>("get_members", {
//       companyId,
//     });
//     setMembers(data);
//     setLoading(false);
//   };

//   const createMember = async (member: Member) => {
//     await invoke("create_member", { member });
//     fetchMembers();
//   };

//   const updateMember = async (member: Member) => {
//     await invoke("update_member", { member });
//     fetchMembers();
//   };

//   const deactivateMember = async (memberId: string) => {
//     await invoke("deactivate_member", {
//       memberId,
//     });
//     fetchMembers();
//   };

//   useEffect(() => {
//     fetchMembers();
//   }, [companyId]);

//   return {
//     members,
//     loading,
//     createMember,
//     updateMember,
//     deactivateMember,
//   };
// }

import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import type { Member } from "./types";
import { writeFile } from "@tauri-apps/plugin-fs";

export default function useMembers(companyId: number) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMembers = async () => {
    setLoading(true);

    const data = await invoke<Member[]>("get_members", {
      companyId,
    });
    console.log(companyId);

    setMembers(data);
    setLoading(false);
  };

  const createMember = async (member: any) => {

    if (member.image_file) {
      const path = member.profile_image;

      const bytes = await member.image_file.arrayBuffer();

      await writeFile(path, new Uint8Array(bytes));
    }

    await invoke("create_member", {
      member: {
        ...member,
        image_file: undefined
      }
    });

    fetchMembers();
  };

  const updateMember = async (member: Member) => {
    await invoke("update_member", {
      member,
    });

    await fetchMembers();
  };

  const deactivateMember = async (memberId: string) => {
    await invoke("deactivate_member", {
      memberId,
      companyId,
    });

    await fetchMembers();
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