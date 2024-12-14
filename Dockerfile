# Stage 1: Build the Angular application
FROM node:18-alpine AS build

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Copy the app source code
COPY . .

# Build the app in production mode
RUN npm run build -- --configuration production

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine

# Copy the build output to Nginx's default public directory
COPY --from=build /app/dist/random-video-ui/browser /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
ADD server.conf /etc/nginx/conf.d

# Expose port 8080
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
