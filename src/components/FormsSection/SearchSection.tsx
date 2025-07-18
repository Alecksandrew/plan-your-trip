import { FaSearch } from "react-icons/fa";
import { useContext } from "react";
import { FormContext } from "../../contexts/formContext";

export default function SearchSection() {

  const  {dispatch}  = useContext(FormContext);

  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    
    if(!dispatch) return;

    dispatch({ type: "SET_DESTINATION", payload: e.target.value });
  }

  return (
    <div className="flex">
      <label className="flex flex-col flex-1 justify-end">
        <span className="text-base font-bold">Para onde você quer viajar?</span>
        <div className="flex items-center border-2 custom-container gap-2">
          <FaSearch />
          <input type="search" id="search" name="search" className="flex-1 focus:outline-0" autoComplete="off" onChange={handleChange} required/>
        </div>
      </label>
    </div>
  );
}
