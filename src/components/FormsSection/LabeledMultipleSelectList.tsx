import MultipleSelectList from "../FormsSection/MultipleSelectList";

interface OptionsObject {
  id: number;
  name: string;
}

interface LabeledListProps {
    containerClassName?: string;
    title: string;
    optionsObject: OptionsObject[];
}


export default function LabeledMultipleSelectList({containerClassName, title, optionsObject}: LabeledListProps) {

    return (
        <label className={`${containerClassName} flex flex-col`}>
            <span className="text-base font-bold" >{title}</span>
            <MultipleSelectList
                options={optionsObject}
            />
        </label>
    )
}