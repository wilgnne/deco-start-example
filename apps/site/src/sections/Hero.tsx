import Counter from "~/components/Counter";

export interface Props {
  /** @title Título */
  title?: string;
  /** @title Descrição */
  description?: string;
}

export async function loader(
  props: Props,
  req: Request,
): Promise<Props> {
  return props;
}

export default function Hero({
  title = "Bem-vindo",
  description = "Edite esta seção pelo admin.deco.cx",
}: Props) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-base opacity-70">{description}</p>

      <Counter />
    </section>
  );
}

export const eager = true;
export const sync = true;