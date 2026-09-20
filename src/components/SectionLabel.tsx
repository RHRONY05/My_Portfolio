type Props = {
  children: React.ReactNode;
  withDot?: boolean;
};

export function SectionLabel({ children, withDot = false }: Props) {
  return (
    <span className="inline-flex items-center gap-2 text-mono uppercase text-accent">
      {withDot && <span className="size-2 rounded-full bg-accent" />}
      {children}
    </span>
  );
}
