# Use the official Node.js image as a base
FROM node:20.15.1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Fix permissions for node_modules (if necessary)
RUN chmod -R 755 /app/node_modules

# Copy the rest of the application code
COPY . .

# Make react-scripts executable
RUN chmod +x ./node_modules/.bin/react-scripts

# Build the React application
RUN npm run build

# Install 'serve' to serve the build
RUN npm install -g serve

# Set the command to run the app
CMD ["serve", "-s", "build"]

# Expose the port on which the app will run
EXPOSE 3000
