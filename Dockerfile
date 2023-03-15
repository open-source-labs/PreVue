# base image that provides runtime environment for the application
FROM node:16.13
# where the application code will be copied to in the docker container
WORKDIR /usr/src/app
# copies all files from the current directory (where the Dockerfile is located) to the working directory in the docker image (which we set on line 4)
COPY . .
RUN npm install
RUN npm run build
# Exposes port 4173 to the host machine, so that it can access the Node.js application running inside the Docker container
EXPOSE 4173 8080
# Specifies the command to run when the Docker container starts
ENTRYPOINT npm run vite
