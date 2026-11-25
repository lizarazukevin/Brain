import { createFileRoute } from "@tanstack/react-router";
import { Home } from "#/components/home";
import { profileQueryOptions } from "#/hooks/usePortfolio";

export const Route = createFileRoute("/")({
  component: HomePage,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(profileQueryOptions()),
});

function HomePage() {
  return <Home />;
}
