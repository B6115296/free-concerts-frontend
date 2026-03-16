FROM node:20-alpine

WORKDIR /app

RUN mkdir -p /app/.next && chmod -R 777 /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]