import { defineRailway, project, service, github, postgres, preserve } from "railway/iac";

export default defineRailway(() => {
    const db = postgres("postgres");

    const backend = service("Brain Backend", {
        source: github("lizarazukevin/brain", {
            rootDirectory: "brain",
        }),
        env: {
            RAILWAY_DOCKERFILE_PATH: "compose/production/django/Dockerfile",
            DATABASE_URL: db.env.DATABASE_URL,
        }
    });

    const frontend = service("Brain Frontend", {
        source: github("lizarazukevin/brain", {
            rootDirectory: "frontend",
        }),
        env: {
            VITE_API_URL: preserve(),
        },
    });

    return project("GitKord Backend", {
        resources: [db, backend, frontend],
    })
});
