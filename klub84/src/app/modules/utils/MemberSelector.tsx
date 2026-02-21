// import { useEffect, useState } from "react";
// import { invoke } from "@tauri-apps/api/core";
// import Input from "../../../app/components/Input";

// type Member = {
//   member_id: string;
//   name: string;
// };

// type Props = {
//   companyId: number;
//   onSelect: (id: string) => void;
// };

// export default function MemberSelector({
//   companyId,
//   onSelect,
// }: Props) {
//   const [members, setMembers] = useState<Member[]>([]);
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     const load = async () => {
//       const data = await invoke<Member[]>("get_members", {
//         company_id: companyId,
//       });
//       setMembers(data);
//     };
//     load();
//   }, [companyId]);

//   const filtered = members.filter((m) =>
//     `${m.member_id} ${m.name}`
//       .toLowerCase()
//       .includes(query.toLowerCase())
//   );

//   return (
//     <div style={{ position: "relative", width: 300 }}>
//       <Input
//         placeholder="Search member..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />

//       {query && (
//         <div
//           style={{
//             position: "absolute",
//             background: "white",
//             border: "1px solid #e5e7eb",
//             width: "100%",
//             maxHeight: 200,
//             overflowY: "auto",
//             zIndex: 10,
//           }}
//         >
//           {filtered.map((m) => (
//             <div
//               key={m.member_id}
//               style={{
//                 padding: 8,
//                 cursor: "pointer",
//               }}
//               onClick={() => {
//                 onSelect(m.member_id);
//                 setQuery(`${m.member_id} - ${m.name}`);
//               }}
//             >
//               {m.member_id} - {m.name}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

type Member = { member_id: string; name: string };

export default function MemberSelector({ onSelect }: { onSelect: (id: string) => void }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    invoke<Member[]>("get_members").then(setMembers);
  }, []);

  const filtered = members.filter((m) =>
    `${m.member_id} ${m.name}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ width: 300 }}>
      <input
        placeholder="Search member"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <div className="dropdown">
          {filtered.map((m) => (
            <div key={m.member_id} onClick={() => onSelect(m.member_id)}>
              {m.member_id} - {m.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}