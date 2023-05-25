FROM node:19-alpine

WORKDIR /app/server

RUN npm install -g nodemon

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

ENV DB_HOST=db

CMD [ "npm", "run", "dev" ]