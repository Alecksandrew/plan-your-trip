import List from "./List";

export default function LabeledList({containerClassName = "", listClassName = "", title, optionsObject}) {

    return (
        <label className={`${containerClassName} flex flex-col w-fit`}>
            <span className="text-base font-bold" >{title}</span>
            <List
                options={optionsObject}
                className={listClassName}
            />
        </label>
    )
}