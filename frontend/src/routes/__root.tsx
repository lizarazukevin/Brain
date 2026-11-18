import { HeadContent, Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import type { QueryClient } from "@tanstack/react-query";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import { SITE_NAME, SITE_DESCRIPTION } from "#/site";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootLayout,
  head: () => ({
    meta: [{ title: SITE_NAME }, { name: "description", content: SITE_DESCRIPTION }],
  }),
});

function RootLayout() {
  return (
    <>
      <HeadContent />
      <Outlet />
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "TanStack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  );
}
