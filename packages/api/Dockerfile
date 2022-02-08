# Dependencies
FROM node:16-alpine AS builder

ENV NODE_ENV production

WORKDIR /usr/src

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run build

# Runner
FROM node:16-alpine AS runner

ENV NODE_ENV production

USER node

WORKDIR /home/node

COPY --from=builder --chown=node:node /usr/src/package.json /usr/src/yarn.lock ./

RUN yarn install --production=true --frozen-lockfile

COPY --from=builder --chown=node:node /usr/src/dist ./dist

EXPOSE 3000

ENV PORT 3000

CMD [ "yarn", "run", "start:prod" ]
