# apps/web/Dockerfile
# 1. Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
# Adicionamos 'npm run build' que é a fase que gera os arquivos finais
RUN npm run build

# 2. Production Stage (Runtime)
FROM node:20-alpine AS runner
WORKDIR /app
ENV PORT 3000
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
# Inicia o servidor Next.js
CMD ["node", "./server.js"]