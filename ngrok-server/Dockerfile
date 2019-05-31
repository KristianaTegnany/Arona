FROM node:10
LABEL maintainer="Diamondra Rasoamanana <diamondraras@gmail.com>"
LABEL version="0.1.0"
# -----------------------------------------------------------------------------

# Declare WORKDIR
WORKDIR /app

# COPY depedency file
COPY package.json /app/package.json

# Install dependencies
RUN npm install --unsafe-perm

# COPY app folder to contain default contents
COPY . /app/

ENTRYPOINT node /app/ngrok-server.js