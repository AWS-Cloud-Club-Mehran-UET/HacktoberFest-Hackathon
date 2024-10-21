FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
RUN npm install vite -g
COPY . .
EXPOSE 5173
RUN chown -R node /usr/src/app
CMD ["npm", "start"]
