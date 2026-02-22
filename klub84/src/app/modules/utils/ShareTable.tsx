import type { ShareScheme } from "./types";
import Button from "../../../app/components/Button";

type Props = {
  schemes: ShareScheme[];
  onEdit: (scheme: ShareScheme) => void;
  onDeactivate: (id: string) => void;
};

export default function SchemeTable({ schemes, onEdit, onDeactivate }: Props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Scheme</th>
          <th>Share Value</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {schemes.map((s) => (
          <tr key={s.scheme_id}>
            <td>{s.scheme_name}</td>
            <td>₹ {s.face_value}</td>
            <td>{s.status}</td>
            <td style={{ display: "flex", gap: 8 }}>
              <Button onClick={() => onEdit(s)}>Update Price</Button>
              <Button variant="secondary" onClick={() => onDeactivate(s.scheme_id)}>
                Deactivate
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}