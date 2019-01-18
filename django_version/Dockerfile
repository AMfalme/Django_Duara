FROM ubuntu:16.04

RUN apt-get update && apt-get install -y \
            python3 python3-dev python3-pip libmysqlclient-dev iputils-ping

COPY . /opt/landing_page
WORKDIR /opt/landing_page

RUN ["mkdir", "/var/log/home"]

RUN ["pip3", "install", "--upgrade", "pip"]
RUN ["pip3", "install","-r", "requirements.txt"]
RUN ["python3", "DuaraWebPage/manage.py", "collectstatic"]


EXPOSE 80
CMD ["uwsgi", "uwsgi.ini"]
