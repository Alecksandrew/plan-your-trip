import { FaSearch } from "react-icons/fa";

export default function SearchSection() {
  return (
    <div className="flex">
      <label className="flex flex-col flex-1 justify-end">
        <span className="text-base font-bold">Para onde você quer viajar?</span>
        <div className="flex items-center border-2 custom-container gap-2">
          <FaSearch />
          <input type="search" id="search" name="search" className="flex-1 focus:outline-0" autoComplete="off"/>
        </div>
      </label>
    </div>
  );
}
