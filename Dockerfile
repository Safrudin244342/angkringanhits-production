FROM node:lts-alpine as build-stage
ARG api_host
ENV VUE_APP_API=${api_host}
RUN npm i yarn
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/default /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
