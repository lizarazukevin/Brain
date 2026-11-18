import { createFileRoute } from "@tanstack/react-router";
import { Career } from "#/components/career";

export const Route = createFileRoute("/career/")({
  component: CareerPage,
});

function CareerPage() {
  return <Career />;
}
