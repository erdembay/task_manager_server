FROM node:20
WORKDIR /app
COPY . .
RUN npm i
CMD ["node","v1/src/app.js"]