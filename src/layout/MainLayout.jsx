import React, { useState } from "react";
import { useSearchQuery } from "../pages/utils";
import { TopBar } from "../components/TopBar";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, onSearchQueryChange] = useSearchQuery();
  return (
    <React.Fragment>
      <TopBar
        showSearch={showSearch}
        searchQuery={searchQuery}
        onSearchChange={onSearchQueryChange}
      />
      <Outlet
        context={{
          showSearch,
          setShowSearch,
        }}
      />
    </React.Fragment>
  );
}
