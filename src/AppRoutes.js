import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import { HostApolloProviderWithParams } from "./containers/apollo/HostApolloProvider";

import { Home } from "./pages/Home";
import { Dimension } from "./pages/Dimension";
import { DimensionChannel } from "./pages/DimensionChannel";
import { Post } from "./pages/Post";
import { DimensionRoutesLayout } from "./pages/layout/DimensionRoutesLayout";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            Layout!
            {/* the child of the root layout */}
            <Outlet />
          </>
        }
      >
        <Route index element={<Home />} />
      </Route>
      <Route
        path="d/"
        element={
          <HostApolloProviderWithParams>
            <DimensionRoutesLayout>
              <Outlet />
            </DimensionRoutesLayout>
          </HostApolloProviderWithParams>
        }
      >
        <Route path=":dimension" element={<Dimension />} />
        <Route
          path=":dimension/channels/:channelId"
          element={<DimensionChannel />}
        />
        <Route path=":dimension/posts/:postId" element={<Post />} />
      </Route>
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
};
