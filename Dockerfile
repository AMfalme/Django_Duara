FROM nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY www /usr/share/nginx/html
