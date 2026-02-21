type Option = {
  label: string;
  value: string;
};

type Props = {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
};

export default function Select({
  label,
  value,
  onChange,
  options,
}: Props) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ fontSize: 13 }}>{label}</label>}
      <select
        className="select"
        value={value}
        onChange={onChange}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
