FROM ubuntu:16.04

RUN apt-get update && apt-get install -y \
            python3 python3-dev python3-pip libmysqlclient-dev iputils-ping

COPY . /opt/landing_page
WORKDIR /opt/landing_page

RUN ["pip3", "install", "--upgrade", "pip"]
RUN ["pip3", "install","-r", "requirements.txt"]

EXPOSE 80
CMD ["python3", "DuaraWebPage/manage.py", "runserver", "0.0.0.0:80"]
