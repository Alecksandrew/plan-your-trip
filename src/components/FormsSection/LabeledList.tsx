import List from "./List";

interface OptionsObject {
  id: number;
  name: string;
}

interface LabeledListProps {
    containerClassName?: string;
    title: string;
    optionsObject: OptionsObject[];
}


export default function LabeledList({containerClassName, title, optionsObject}: LabeledListProps) {

    return (
        <label className={`${containerClassName} flex flex-col`}>
            <span className="text-base font-bold" >{title}</span>
            <List
                options={optionsObject}
            />
        </label>
    )
}