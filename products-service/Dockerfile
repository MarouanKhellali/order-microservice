FROM node:14.16.0-alpine3.13
WORKDIR /app
COPY package* ./
RUN npm install
COPY . ./
# ENV DB_URL=mongodb://mongo-server/orders-db
EXPOSE 3000
CMD [ "npm", "start" ]