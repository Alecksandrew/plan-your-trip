export default function DatePicker() {
  return (
    <div>
        <span className="text-base font-bold">Duração</span>
        <div className="flex justify-between gap-4">
            <label className="flex flex-col w-fit flex-1">
                <span>Data de início</span>
                <input type="date" id="start" name="startDate" className="custom-container"/>
            </label>
            <label className="flex flex-col w-fit flex-1">
                <span>Data de fim</span>
                <input type="date" id="end" name="endDate" className="custom-container"/>
            </label>
        </div>
    </div>
  );
}