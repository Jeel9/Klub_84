
import { useState } from "react";

export default function MemberSearch({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      onSearch(query.trim());
    }
  };

  return (
    <div style={{ width: 320 }}>
      <input
        value={query}
        placeholder="Search member..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleEnter}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 8,
          border: "1px solid #e5e7eb",
        }}
      />
    </div>
  );
}