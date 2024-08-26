FROM node:20.14.0

WORKDIR /src

COPY package*.json ./../

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]