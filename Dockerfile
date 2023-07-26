FROM alpine
# Building alpine to run node apps.
run apk update ; apk add npm; apk add --no-cache busybox-extras; apk add tzdata; ln -snf /usr/share/zoneinfo/Asia/Kolkata /etc/localtime && echo "Asia/Kolkata" > /etc/timezone

#ENV TZ="Asia/Kolkata"

COPY . /code/
#COPY ./run.sh /code/
WORKDIR /code/

RUN   cd /code/ ; npm install ;   chmod +x /code/run.sh ; ln -snf /usr/share/zoneinfo/Asia/Kolkata /etc/localtime && echo "Asia/Kolkata" > /etc/timezone ;
ENTRYPOINT ["./run.sh"]

#Added by CP
