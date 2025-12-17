# apps/web/Dockerfile
# 1. Base Image
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app

# 2. Dependencies Stage
FROM base AS deps
COPY package.json package-lock.json ./
# Use npm ci for deterministic installs instructions
RUN npm ci

# 3. Development Stage
FROM base AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Default command for dev
CMD ["npm", "run", "dev"]

# 4. Build Stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 5. Production Stage (Runtime)
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV PORT 3000

# Copy public assets
COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

CMD ["node", "server.js"]