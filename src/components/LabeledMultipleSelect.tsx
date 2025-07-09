export default function LabeledMultipleSelect({ title, optionsArray }) {
  return (
    <label className="flex flex-col w-fit">
      <span className="text-base font-bold">{title}</span>
    </label>
  );
}