import { createFileRoute, redirect } from "@tanstack/react-router";

// Catch-all: any URL that doesn't match a known route gets redirected home.
export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
