FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps && npm cache clean --force

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
