FROM node 

WORKDIR /app

COPY server.js server.js 
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install 


CMD [ "node", "server.js"]