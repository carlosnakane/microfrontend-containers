FROM node:11.14.0-alpine

COPY . .

RUN cd frontend \
  && npm i \ 
  && npm run build

CMD ["node", "frontend/static-server/index.js"]