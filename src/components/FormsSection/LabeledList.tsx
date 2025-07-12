import List from "./List";
import type { SetStringAction, OptionsObject } from "../../sharedInterfaces/formInterfaces";



interface LabeledListProps {
    containerClassName?: string;
    title: string;
    optionsObject: OptionsObject[];
    dispatchType: SetStringAction['type'];
}


export default function LabeledList({containerClassName, title, optionsObject, dispatchType}: LabeledListProps) {

    return (
        <label className={`${containerClassName} flex flex-col`}>
            <span className="text-base font-bold" >{title}</span>
            <List
                options={optionsObject}
                dispatchType={dispatchType}
            />
        </label>
    )
}