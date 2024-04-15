FROM node:18

EXPOSE 3000

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

CMD yarn migrate && yarn start
