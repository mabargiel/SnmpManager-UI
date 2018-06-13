FROM node:latest
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]