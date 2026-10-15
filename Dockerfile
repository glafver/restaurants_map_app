# syntax=docker/dockerfile:1

############################################################
# Stage 1 - build the React/Vite client
############################################################
FROM node:22-alpine AS build
WORKDIR /app

# Vite 2.x uses an esbuild binary that is compiled against glibc,
# so it needs libc6-compat to run on Alpine (musl).
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Build-time configuration. Vite statically replaces import.meta.env.VITE_*
# while running `vite build`, so these must be present at build time.
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID
ARG VITE_GOOGLE_MAPS_API_KEY

ENV VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY \
    VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN \
    VITE_FIREBASE_PROJECT_ID=$VITE_FIREBASE_PROJECT_ID \
    VITE_FIREBASE_STORAGE_BUCKET=$VITE_FIREBASE_STORAGE_BUCKET \
    VITE_FIREBASE_MESSAGING_SENDER_ID=$VITE_FIREBASE_MESSAGING_SENDER_ID \
    VITE_FIREBASE_APP_ID=$VITE_FIREBASE_APP_ID \
    VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY

RUN npm run build

############################################################
# Stage 2 - serve the static site with nginx
############################################################
FROM nginx:1.27-alpine AS runtime

# Cloud Run injects PORT (default 8080). Keep a default for local runs.
ENV PORT=8080

# The official nginx image runs envsubst on /etc/nginx/templates/*.template
# and writes the result to /etc/nginx/conf.d/, so ${PORT} is replaced with
# the actual port at container start.
COPY docker/nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
