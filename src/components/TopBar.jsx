import { NavLink, createSearchParams } from "react-router-dom";
import { SearchInput } from "./SearchInput";
import "./TopBar.css";
import { buildSearchParam } from "../pages/utils";
import PropTypes from "prop-types";
import { MoreIcon } from "../icons/MoreIcon";
import { AppIconButton } from "./AppButton";
import {
  Popup,
  PopupContent,
  PopupItem,
  PopupItemIcon,
  PopupItemText,
} from "./Popup";
import { AccountCircleIcon } from "../icons/AccountCircleIcon";
import { LogoutCircleIcon } from "../icons/LogoutCircleIcon";

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

TopBarTabsItem.propTypes = {
  to: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export function TopBarTabs({ children }) {
  return <ul className="top-bar-tabs">{children}</ul>;
}

TopBarTabs.propTypes = {
  children: PropTypes.node,
};

export function TopBarPopupContent({ userName, onLogout }) {
  return (
    <PopupContent>
      <PopupItem>
        <PopupItemIcon>
          <AccountCircleIcon />
        </PopupItemIcon>
        <PopupItemText>{userName}</PopupItemText>
      </PopupItem>
      <PopupItem clickable onClick={onLogout}>
        <PopupItemIcon>
          <LogoutCircleIcon />
        </PopupItemIcon>
        <PopupItemText>Logout</PopupItemText>
      </PopupItem>
    </PopupContent>
  );
}

export function TopBar({
  showSearch,
  searchQuery,
  onSearchChange,
  userName,
  onLogout,
}) {
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
      {showSearch && (
        <SearchInput
          value={searchQuery}
          onChange={(el) => onSearchChange(el.target.value)}
        />
      )}
      <Popup>
        <AppIconButton>
          <MoreIcon />
        </AppIconButton>
        <TopBarPopupContent userName={userName} onLogout={onLogout} />
      </Popup>
    </header>
  );
}

TopBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  showSearch: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};
