#!/usr/bin/env bash
npm run build &&
docker run --name foodcountry-nginx -v $1:/usr/share/nginx/html:ro -p 8081:80 -d nginx:1.16.0-alpine
