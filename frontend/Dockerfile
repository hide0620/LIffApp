FROM node:17.4.0-alpine
WORKDIR /usr/src/app
RUN apk update && apk add bash
COPY ./my-app ./my-app
WORKDIR /usr/src/app/my-app
RUN npm install
CMD ["npm", "run", "dev"]



