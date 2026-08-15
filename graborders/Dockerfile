# Stage 1: Skip building, just copy the build folder
FROM nginx:alpine

# Copy custom nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy pre-built React app
COPY ./dist /usr/share/nginx/html