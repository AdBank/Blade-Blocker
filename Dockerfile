FROM python:2.7-stretch

WORKDIR /app

COPY . /app

RUN chmod +x build.py

RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash \
    && apt-get install nodejs -yq

RUN pip install Jinja2

RUN apt-get install zip
