import { useCount } from "~/hooks/useCount";

const Counter: React.FC = () => {
  const { count, increment, decrement } = useCount();

  return (
    <div className="flex items-center gap-4">
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={decrement}
      >
        -
      </button>
      <span className="text-lg font-bold">{count}</span>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={increment}
      >
        +
      </button>
    </div>
  )
}

export default Counter;
