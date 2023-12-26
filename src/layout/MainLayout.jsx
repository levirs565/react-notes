import React, { useState } from "react";
import { useSearchQuery } from "../pages/utils";
import { TopBar } from "../components/TopBar";
import { Navigate, Outlet } from "react-router-dom";
import { useLoggedUser } from "../api";

export function MainLayout() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, onSearchQueryChange] = useSearchQuery();
  const { user, isLoading } = useLoggedUser();

  if (isLoading) return null;

  if (!user) return <Navigate to="/login" />;

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
