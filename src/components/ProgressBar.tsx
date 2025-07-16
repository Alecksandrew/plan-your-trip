
type ProgressBarProps = {
    progress: `${number}%`;
};


export default function ProgressBar({progress = "40%"}:ProgressBarProps) {


    return (
        <div className="w-2/3 mx-auto bg-gray-200 rounded h-5 dark:bg-gray-700">
            <div className="bg-paleta-01 h-full rounded transition-all duration-1000 ease-in-out" style={{ width: progress }}></div>
        </div>
    )
}