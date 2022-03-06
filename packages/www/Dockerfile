# Deps
FROM node:16-alpine AS deps

WORKDIR /usr/src

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Builder
FROM node:16-alpine AS builder

WORKDIR /usr/src

COPY --from=deps /usr/src/node_modules ./node_modules

COPY . .

RUN yarn run build

# Runner
FROM node:16-alpine AS runner

WORKDIR /home/node

ENV NODE_ENV production

COPY --from=deps --chown=node:node /usr/src/node_modules ./node_modules

COPY --from=builder --chown=node:node /usr/src/next.config.js ./next.config.js

COPY --from=builder --chown=node:node /usr/src/public ./public
COPY --from=builder --chown=node:node /usr/src/package.json ./package.json

COPY --from=builder --chown=node:node /usr/src/.next ./.next

USER node

EXPOSE 3000

ENV PORT 3000

CMD [ "yarn", "run", "start" ]
