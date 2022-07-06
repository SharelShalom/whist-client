FROM node:14.9.0 AS build-step

WORKDIR /build
COPY package.json package-lock.json ./
RUN npm install

COPY . .
# COPY /src ./
# COPY /public ./
RUN npm run build
# CMD ["npm", "start"]

FROM nginx:1.18-alpine
COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=build-step /build/build /frontend/build
COPY --from=build-step /build/ /usr/share/nginx/html