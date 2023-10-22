import "./TopBar.css";

export function TopBar({ searchQuery, onChangeSearch }) {
  return (
    <header className="top-bar">
      <h1 className="top-bar--title">Notes</h1>
      <div className="top-bar--grow" />
      <input
        value={searchQuery}
        className="top-bar--search"
        type="text"
        placeholder="Cari..."
        onChange={(el) => onChangeSearch(el.target.value)}
      />
    </header>
  );
}
