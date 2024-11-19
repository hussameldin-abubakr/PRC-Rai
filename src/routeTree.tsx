import { Route, RootRoute } from '@tanstack/react-router';
import { Layout } from './components/Layout';
import { Overview } from './pages/Overview';
import { Production } from './pages/Production';
import { FieldMap } from './pages/FieldMap';
import { Settings } from './pages/Settings';

const rootRoute = new RootRoute({
  component: Layout,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Overview,
});

const productionRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/production',
  component: Production,
});

const mapRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/map',
  component: FieldMap,
});

const settingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: Settings,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  productionRoute,
  mapRoute,
  settingsRoute,
]);