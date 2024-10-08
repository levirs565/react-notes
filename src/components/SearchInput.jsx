import { AppInput } from "./AppInput";
import { SearchIcon } from "../icons/SearchIcon";
import PropTypes from "prop-types";
import "./SearchInput.css";

export function SearchInput({ value, onChange }) {
  return (
    <div className="search-input">
      <label
        aria-label="Search"
        className="search-input--label"
        htmlFor="search"
      >
        <SearchIcon className="search-input--icon" />
      </label>
      <AppInput
        value={value}
        id="search"
        className="search-input--input"
        type="text"
        placeholder="Cari..."
        onChange={(el) => onChange(el)}
      />
    </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
