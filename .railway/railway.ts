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
    source: github("lizarazukevin/Brain", {
      rootDirectory: "/brain",
      checkSuites: true,
    }),
    build: {
      builder: "DOCKERFILE",
      dockerfilePath: "/brain/compose/production/django/Dockerfile",
    },
    networking: { privateNetworkEndpoint: "brain" },
    env: {
      DATABASE_URL: db.env.DATABASE_URL,
      SENTRY_DSN: preserve(),
      SENTRY_ENVIRONMENT: preserve(),
      SENTRY_TRACES_SAMPLE_RATE: preserve(),
      CELERY_FLOWER_PASSWORD: preserve(),
      CELERY_FLOWER_USER: preserve(),
      CORS_ALLOWED_ORIGINS: preserve(),
      DJANGO_ACCOUNT_ALLOW_REGISTRATION: preserve(),
      DJANGO_ADMIN_URL: preserve(),
      DJANGO_ALLOWED_HOSTS: preserve(),
      DJANGO_AWS_ACCESS_KEY_ID: preserve(),
      DJANGO_AWS_S3_CUSTOM_DOMAIN: preserve(),
      DJANGO_AWS_S3_REGION_NAME: preserve(),
      DJANGO_AWS_SECRET_ACCESS_KEY: preserve(),
      DJANGO_AWS_STORAGE_BUCKET_NAME: preserve(),
      DJANGO_SECRET_KEY: preserve(),
      DJANGO_SERVER_EMAIL: preserve(),
      DJANGO_SETTINGS_MODULE: preserve(),
      DJANGO_SUPERUSER_EMAIL: preserve(),
      DJANGO_SUPERUSER_PASSWORD: preserve(),
      DJANGO_SUPERUSER_USERNAME: preserve(),
      POSTMARK_SERVER_TOKEN: preserve(),
      REDIS_URL: preserve(),
      WEB_CONCURRENCY: preserve(),
    },
  });

  const frontend = service("Brain Frontend", {
    source: github("lizarazukevin/Brain", {
      rootDirectory: "/frontend",
      checkSuites: true,
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
