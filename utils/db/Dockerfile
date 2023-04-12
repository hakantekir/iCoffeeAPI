FROM mysql

ENV MYSQL_ROOT_PASSWORD=asdfg12345
ENV MYSQL_DATABASE=iCoffee

COPY dump.sql /docker-entrypoint-initdb.d/

EXPOSE 3306