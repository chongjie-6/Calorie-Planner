export default function GenerateButton({
  onClick,
}: {
  onClick: () => Promise<void>;
}) {
  return (
    <button
      className="generate_btn primary_btn hover:bg-red-500"
      onClick={() => onClick()}
    >
      Generate
    </button>
  );
}
