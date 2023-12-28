import { AppInput } from "./AppInput";
import { SearchIcon } from "../icons/SearchIcon";
import PropTypes from "prop-types";
import "./SearchInput.css";
import { useI8n } from "../provider/context";

export function SearchInput({ value, onChange }) {
  const { getText } = useI8n();
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
        placeholder={getText("searchPlaceholder")}
        onChange={(el) => onChange(el)}
      />
    </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
