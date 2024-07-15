FROM python:3-alpine

WORKDIR /app

RUN mkdir tax-be tax-fe

COPY /tax-be/tax_be/ /app/tax-be

RUN cd tax-be/ && pip install --no-cache-dir -r requirements.txt

RUN apk add --update nodejs npm
RUN apk add --update alpine-sdk # for ruby-dev to install foreman

RUN apk add ruby ruby-dev
RUN gem install foreman

COPY /tax-fe /app/tax-fe

RUN cd tax-fe/ && npm install

COPY Procfile Procfile

CMD ["foreman", "start"]
