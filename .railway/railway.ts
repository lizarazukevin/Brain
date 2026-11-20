import { defineRailway, project, service, github, postgres, preserve, volume } from "railway/iac";

export default defineRailway(() => {
  const db = postgres("postgres");
  const db_vol = volume("postgres-volume", {
    alerts: { usage: { "100": {}, "80": {}, "95": {} } },
    allowOnlineResize: true,
    region: "us-east4-eqdc4a",
    sizeMB: 5000,
  });

  const backend = service("Brain Backend", {
    source: github("lizarazukevin/brain", {
      rootDirectory: "brain",
    }),
    build: {
      builder: "DOCKERFILE",
      dockerfilePath: "/brain/compose/production/django/Dockerfile",
    },
    networking: { privateNetworkEndpoint: "brain-backend" },
    env: {
      DATABASE_URL: db.env.DATABASE_URL,
    },
  });

  const frontend = service("Brain Frontend", {
    source: github("lizarazukevin/brain", {
      rootDirectory: "frontend",
    }),
    networking: { privateNetworkEndpoint: "brain-frontend" },
    env: {
      VITE_API_BASE_URL: preserve(),
    },
  });

  return project("Portfolio", {
    resources: [db, db_vol, backend, frontend],
  });
});
