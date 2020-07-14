FROM tiangolo/uwsgi-nginx-flask:python3.8

MAINTAINER Salem Code "salemcode8@gmail.com"

# Make working directory
ADD requirements.txt /app

# Install requirements
RUN pip install -r requirements.txt

# Copy project to docker work directory
ADD maps /app


ENV LISTEN_PORT 80

EXPOSE 80