FROM node:15.5.0-slim
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

#build client app
WORKDIR /app/client-app

RUN npm install --production

RUN npm run build

#run app
WORKDIR /app

CMD [ "node", "app.js" ]