FROM node:20-alpine AS build
#Si quiero cosas globales las instalo acá.
RUN npm install fastify-cli --global
WORKDIR /app

#development stage
FROM build AS development
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

#test stage
FROM development AS test
COPY package*.json ./
RUN npm ci
COPY . .

CMD ["npm", "run", "start"]