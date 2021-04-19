FROM node:14.16-alpine as frontend-builder
WORKDIR /home/app
COPY ./node_modules ./node_modules
COPY ./tsconfig.json ./
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./.babelrc ./
COPY ./frontend ./frontend
RUN yarn run build

FROM node:14-alpine as api-builder
WORKDIR /home/app
COPY ./tsconfig.json ./
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./bin ./bin
COPY ./server/ ./server
RUN yarn install --production=true

FROM node:14-alpine
ENV NODE_ENV=production
EXPOSE 8080
WORKDIR /home/app

COPY ./package.json ./
COPY ./yarn.lock ./
COPY --from=frontend-builder /home/app/dist/ ./dist/
COPY --from=api-builder /home/app/server ./server
COPY --from=api-builder /home/app/bin ./bin
COPY --from=api-builder /home/app/node_modules ./node_modules

CMD ["node", "./bin/www"]
