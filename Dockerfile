FROM node:16-alpine

LABEL org.opencontainers.image.source https://github.com/nais/deploy-frontend

WORKDIR /home/app
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./packages/frontend/package.json ./packages/frontend/package.json
COPY ./packages/server/package.json ./packages/server/package.json
COPY ./bin ./bin

RUN yarn install --frozen-lockfile

COPY ./packages ./packages

ENV NODE_ENV=production
WORKDIR /home/app

RUN yarn workspaces run build
RUN cp -R packages/frontend/build dist

CMD ["node", "./bin/www"]
