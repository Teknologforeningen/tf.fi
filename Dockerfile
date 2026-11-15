FROM ghcr.io/pnpm/pnpm:12 AS base
RUN pnpm runtime set node 24 -g
WORKDIR /app

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN pnpm build

FROM node:24.22-slim AS run
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_BASE_URL=https://cms.tf.fi

COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static .next/static
COPY --from=build --chown=node:node /app/.env ./

RUN mkdir -p .next/cache
RUN chown -R node:node .next

USER node

EXPOSE 3000

CMD ["node", "server.js"]
