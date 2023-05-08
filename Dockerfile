FROM node:18.13.0-alpine

WORKDIR /app

COPY package.json ./
RUN yarn install --production=false

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["node", "dist/server.js"]