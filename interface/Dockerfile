FROM tiangolo/uwsgi-nginx-flask:python3.8

MAINTAINER Salem Code "salemcode8@gmail.com"

# Make working directory
ADD requirements.txt /app

# Install requirements
RUN pip install -r requirements.txt

ENV LISTEN_PORT 80
ENV FLASK_DUBUG 1
ENV FLASK_ENV development
ENV FLASK_APP main.py

EXPOSE 80