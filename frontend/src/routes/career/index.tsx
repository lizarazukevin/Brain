import { createFileRoute } from "@tanstack/react-router";
import { Career } from "#/components/career";
import {
  educationQueryOptions,
  projectsQueryOptions,
  workExperiencesQueryOptions,
} from "#/hooks/usePortfolio";

export const Route = createFileRoute("/career/")({
  component: CareerPage,
  loader: ({ context: { queryClient } }) => {
    return Promise.all([
      queryClient.ensureQueryData(workExperiencesQueryOptions()),
      queryClient.ensureQueryData(projectsQueryOptions()),
      queryClient.ensureQueryData(educationQueryOptions()),
    ]);
  },
});

function CareerPage() {
  return <Career />;
}
