
# ---- build ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN npm run build

# ---- runtime (npm + shell YOK) ----
FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nonroot
ENV NODE_ENV=production
ENV PORT=4000

CMD ["server.js"]