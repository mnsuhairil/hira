FROM nginx:1.16.1
WORKDIR /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d
COPY rundocker.sh /usr/local/bin/rundocker.sh
RUN chmod 777 /usr/local/bin/rundocker.sh \
    && ln -s /usr/local/bin/rundocker.sh /
COPY dist/ .
CMD ["rundocker.sh"]