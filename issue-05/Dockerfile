# Use the official Nginx image from the Docker Hub
FROM nginx:alpine

# Copy the index.html file into the Nginx server's default directory
COPY index.html /usr/share/nginx/html/

# Expose port 80 to allow access to the web application
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
