FROM node:11.14.0-alpine

COPY . .

RUN cd frontend \
  && sh print-env.sh > src/env.js \
  && npm i \ 
  && npm run build

CMD ["npm", "run", "--prefix", "frontend", "http-server"]