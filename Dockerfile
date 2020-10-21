FROM node:alpine

WORKDIR /usr/app
COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

ENV NODE_PATH=.

CMD ["yarn", "start"]
