# Use a base image
FROM nginx:alpine

# Copy HTML and CSS files to nginx root directory
COPY index.html /usr/share/nginx/html
COPY style.css /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
