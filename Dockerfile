FROM node:11.1.0-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install C compiler, npm packages and set the correct host in config
RUN apk add --update \
    build-base \
    automake \
    autoconf \
  && npm install

# Make port 1337 available to the world outside this container
EXPOSE 1337

VOLUME ["/app"]

# Start strapi when container launches
CMD NODE_ENV=production npm start
