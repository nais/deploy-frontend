FROM node:13-alpine as frontend-builder
WORKDIR /home/app
COPY ./node_modules ./node_modules
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./.babelrc ./
COPY ./frontend ./frontend
RUN yarn run build

FROM node:13-alpine as api-builder
WORKDIR /home/app
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./bin ./bin
COPY ./server/public ./server/public
COPY ./server/src ./server/src
RUN yarn install --production=true

FROM node:13-alpine
ENV NODE_ENV=production
EXPOSE 8080
WORKDIR /home/app

COPY ./package.json ./
COPY ./yarn.lock ./
COPY --from=frontend-builder /home/app/dist/ ./dist/
COPY --from=api-builder /home/app/server ./api/server
COPY --from=api-builder /home/app/bin ./api/bin
COPY --from=api-builder /home/app/node_modules ./node_modules

CMD ["node", "./bin/www"]