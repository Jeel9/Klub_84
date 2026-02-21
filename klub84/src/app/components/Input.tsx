type Props = {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
};

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: Props) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ fontSize: 13 }}>{label}</label>}
      <input
        className="input"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
