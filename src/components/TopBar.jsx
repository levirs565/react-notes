import { SearchInput } from "./SearchInput";
import "./TopBar.css";

export function TopBar({ searchQuery, onChangeSearch }) {
  return (
    <header className="top-bar">
      <h1 className="top-bar--title">Notes</h1>
      <div className="top-bar--grow" />
      <SearchInput
        value={searchQuery}
        onChange={(el) => onChangeSearch(el.target.value)}
      />
    </header>
  );
}
