FROM node:lts

RUN mkdir /financial-movements-backend

COPY . /financial-movements-backend

WORKDIR /financial-movements-backend

RUN npm install && npm run build

ENV TWILIO_ACCOUNT_SID=

ENV TWILIO_AUTH_TOKEN=

ENV TWILIO_VERIFY_SERVICE=

ENV DB_URI=

ENV JWT_SECRET=

ENV PORT=

EXPOSE ${PORT}

CMD ["npm", "run", "start:prod"]