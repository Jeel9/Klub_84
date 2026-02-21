type Props = {
  children: React.ReactNode;
  type?: "success" | "danger";
};

export default function Badge({
  children,
  type = "success",
}: Props) {
  return (
    <span className={`badge badge-${type}`}>
      {children}
    </span>
  );
}
