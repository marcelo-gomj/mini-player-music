import Player from "@renderer/components/FrontApp/Player";
import Layout from "@renderer/components/Layout";
import LIbrarySection from "@renderer/components/Libraries/Library";
import { createContext, useState } from "react";


const ROUTES = {
  "player": Player,
  "library": LIbrarySection,
}

type RoutePaths = keyof typeof ROUTES;
type RouterContextProps = {
  currentPath: RoutePaths,
  setRoute: (path: RoutePaths) => void
}

export const RouterContext = createContext({} as RouterContextProps);

export function RouterProvider() {
  const [path, setPath] = useState<RoutePaths>('player');

  const Page = ROUTES[path];

  return (
    <RouterContext.Provider value={{ setRoute, currentPath: path }}>
      <Layout>
        <Page />
      </Layout>
    </RouterContext.Provider>
  )

  function setRoute(path: RoutePaths) {
    setPath(path);
  }
}
