FROM node:20.0.0-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .

# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install
# Build the app
RUN npm run build

# ==== RUN =======
# Set the env to "production"
ARG port=${PORT}
ARG service_name=${SERVICE_NAME}
ARG db_host=${DB_HOST}
ARG db_user=${DB_USER}
ARG db_pass=${DB_PASS}
ARG db_name=${DB_NAME}
ARG db_port=${DB_PORT}
ARG db_client=${DB_CLIENT}
ENV ENV develop
ENV VERSION 0.0.1
ENV PORT=$port
ENV SERVICE_NAME=$service_name
ENV DB_HOST=$db_host
ENV DB_USER=$db_user
ENV DB_PASS=$db_pass
ENV DB_NAME=$db_name
ENV DB_PORT=$db_port
ENV DB_CLIENT=$db_client
ENV FILE_ENCODING utf8
# Expose the port on which the app will be running (8080 is the default that `serve` uses)
#EXPOSE 8080
# Start the app
CMD [ "npm", "start" ]