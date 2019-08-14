FROM node:8.15.1

# Create app directory
WORKDIR ./app

# Copies project source from host into container's working
# directory and installs project dependencies
# dependencies
COPY . ./
RUN npm install

CMD ["npm", "run", "start-dev"]


