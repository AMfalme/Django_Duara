FROM ubuntu:16.04

RUN apt-get update && apt-get install -y \
            python3 python3-dev python3-pip libmysqlclient-dev iputils-ping

RUN ["mkdir", "/var/log/home"]
RUN ["mkdir", "/opt/home"]

WORKDIR /opt/home

# Install pip requirements
COPY requirements.txt requirements.txt 
RUN ["pip3", "install", "--upgrade", "pip"]
RUN ["pip3", "install","-r", "requirements.txt"]

COPY . /opt/home
RUN ["python3", "manage.py", "collectstatic"]
#VOLUME /opt/home

EXPOSE 80
CMD ["./bin/start"]
