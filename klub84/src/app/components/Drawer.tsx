type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Drawer({
  open,
  onClose,
  children,
}: Props) {
  if (!open) return null;

  return (
    <>
      <div
        className="drawer-overlay"
        onClick={onClose}
      />
      <div className="drawer">
        {children}
      </div>
    </>
  );
}
