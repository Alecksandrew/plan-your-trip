import List from "./List";

export default function LabeledList({containerClassName = "", listClassName = "", title, optionsObject}) {

    return (
        <label className={`${containerClassName} flex flex-col`}>
            <span className="text-base font-bold" >{title}</span>
            <List
                options={optionsObject}
                className={`${listClassName} flex-1`}
            />
        </label>
    )
}