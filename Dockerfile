# Etapa 1 - Build da aplicação Angular
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --output-hashing=all

# Etapa 2 - Servir com Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/flexy-admin-angular-lite /usr/share/nginx/html
EXPOSE 8080
