export interface Props {
  /** @title Título */
  title?: string;
}

export default function Header({ title = "Título" }: Props) {
  return (
    <header className="py-8 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
    </header>
  );
}
