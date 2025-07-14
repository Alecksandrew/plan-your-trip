import MultipleSelectList from "../FormsSection/MultipleSelectList";
import type { SetArrayAction } from "../../types/formInterfaces";

interface OptionsObject {
  id: number;
  name: string;
}

interface LabeledListProps {
  containerClassName?: string;
  title: string;
  optionsObject: OptionsObject[];
  dispatchType: SetArrayAction["type"];
}

export default function LabeledMultipleSelectList({
  containerClassName,
  title,
  optionsObject,
  dispatchType,
}: LabeledListProps) {
  return (
    <label className={`${containerClassName} flex flex-col`}>
      <span className="text-base font-bold">{title}</span>
      <MultipleSelectList options={optionsObject} dispatchType={dispatchType} />
    </label>
  );
}
