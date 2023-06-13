FROM alpine:3.16

ENV TARGET="naver.com"
ENV METHOD="HEAD"
ENV INTERVAL="2000"

WORKDIR /app
COPY app.js .

CMD ["node","app.js"]
