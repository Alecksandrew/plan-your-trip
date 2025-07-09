export default function DatePicker() {
  return (
    <div>
        <span className="text-base font-bold">Duração</span>
        <div className="flex">
            <label className="flex flex-col w-fit">
                <span>Data de início</span>
                <input type="date" id="start" name="startDate" className="container"/>
            </label>
            <label className="flex flex-col w-fit">
                <span>Data de fim</span>
                <input type="date" id="end" name="endDate" className="container"/>
            </label>
        </div>
    </div>
  );
}