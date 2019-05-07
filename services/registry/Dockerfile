FROM node:11.14.0-alpine

COPY . .

RUN cd /api \
  && npm i \
  && npm run build

CMD ["node", "api/dist/index.js"]

#CMD ["node", "src/index.js"]
