FROM node:11.14.0-alpine

COPY . .

RUN npm i && npm run build

CMD ["node", "src/index.js"]