From node:14 as build

WORKDIR /software

COPY package*.json ./

RUN npm install

COPY public public/
COPY src src/

RUN npm run build

FROM nginx:alpine
COPY --from=build /software/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]