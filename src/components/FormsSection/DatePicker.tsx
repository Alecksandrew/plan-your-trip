import { useContext, useState, useEffect } from "react";
import { FormContext } from "../../contexts/formContext";

export default function DatePicker() {
  const { dispatch } = useContext(FormContext);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (startDate && endDate) {

      function formatDate(date:string) {
        return date.split("-").reverse().join("/")
      }

      const formatedStartDate = formatDate(startDate);
      const formatedEndDate = formatDate(endDate);

      dispatch({ type: "SET_DATE", payload: formatedStartDate + " - " + formatedEndDate });

    }
  }, [startDate, endDate]);

  function handleStartDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStartDate(e.target.value);
  }

  function handleEndDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEndDate(e.target.value);
  }

  return (
    <div>
      <span className="text-base font-bold">Duração</span>
      <div className="flex justify-between gap-2">
        <label className="flex flex-col w-fit flex-1">
          <span>Data de início</span>
          <input
            type="date"
            id="start"
            name="startDate"
            className="custom-container"
            onChange={handleStartDateChange}
            required
          />
        </label>
        <label className="flex flex-col w-fit flex-1">
          <span>Data de fim</span>
          <input
            type="date"
            id="end"
            name="endDate"
            className="custom-container"
            onChange={handleEndDateChange}
            required
          />
        </label>
      </div>
    </div>
  );
}
