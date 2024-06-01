FROM node

RUN npm install -g nodemon

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4000

CMD [ "npm" , "run", "start" ]
