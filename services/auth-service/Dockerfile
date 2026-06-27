FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

COPY services/auth-service/package*.json ./services/auth-service/

RUN npm install

COPY . .

RUN npm run build -w auth-service

WORKDIR /app/services/auth-service

EXPOSE 5001

CMD ["npm","run","start"]