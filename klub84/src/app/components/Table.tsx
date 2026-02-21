type Props = {
  headers: string[];
  children: React.ReactNode;
};

export default function Table({
  headers,
  children,
}: Props) {
  return (
    <table className="table">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
