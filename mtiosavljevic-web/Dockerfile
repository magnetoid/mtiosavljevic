FROM nginx:1.27-alpine AS runner

RUN apk add --no-cache bash gettext

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY runtime-config.template.js /etc/mtio/runtime-config.template.js
COPY entrypoint.sh /entrypoint.sh

COPY dist /usr/share/nginx/html

RUN chmod +x /entrypoint.sh

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:80/health || exit 1

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
