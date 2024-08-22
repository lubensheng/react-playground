FROM nginx

WORKDIR /home/reactPlayground

COPY ./dist /home/reactPlayground

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]