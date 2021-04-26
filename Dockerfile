FROM nginx

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/snippets/self-signed.conf /etc/nginx/snippets/self-signed.conf
COPY nginx/snippets/ssl-params.conf /etc/nginx/snippets/ssl-params.conf
COPY nginx/ssl/certs/dhparam.pem /etc/ssl/certs/dhparam.pem
COPY nginx/ssl/certs/self-signed.crt /etc/ssl/certs/self-signed.crt
COPY nginx/ssl/certs/self-signed.crt /etc/ssl/certs/self-signed.crt
COPY nginx/ssl/private/self-signed.key /etc/ssl/private/self-signed.key
