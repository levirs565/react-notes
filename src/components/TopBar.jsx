import { NavLink, createSearchParams } from "react-router-dom";
import { SearchInput } from "./SearchInput";
import "./TopBar.css";
import { buildSearchParam } from "../pages/utils";

export function TopBarTabsItem({ to, children }) {
  return (
    <li className="top-bar-tabs--item">
      <NavLink
        className={({ isActive }) =>
          [
            "top-bar-tabs--item-link",
            isActive ? "top-bar-tabs--item-link--active" : "",
          ].join(" ")
        }
        to={to}
      >
        {children}
      </NavLink>
    </li>
  );
}

export function TopBarTabs({ children }) {
  return <ul className="top-bar-tabs">{children}</ul>;
}

export function TopBar({ searchQuery, onSearchChange }) {
  const searchParam = createSearchParams(
    buildSearchParam(searchQuery)
  ).toString();
  return (
    <header className="top-bar">
      <h1 className="top-bar--title">Notes</h1>
      <TopBarTabs>
        <TopBarTabsItem
          to={{
            pathname: "/",
            search: searchParam,
          }}
        >
          Aktif
        </TopBarTabsItem>
        <TopBarTabsItem
          to={{
            pathname: "/archive",
            search: searchParam,
          }}
        >
          Arsip
        </TopBarTabsItem>
      </TopBarTabs>
      <div className="top-bar--grow" />
      <SearchInput
        value={searchQuery}
        onChange={(el) => onSearchChange(el.target.value)}
      />
    </header>
  );
}
