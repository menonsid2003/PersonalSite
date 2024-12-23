# Use the official Node.js image as the base image
FROM node:21.7.2-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm

    # Install TypeScript globally
RUN npm install -g typescript

RUN npm install --save-dev @types/react @types/react-dom
RUN npm install --save-dev typescript-plugin-css-modules

# Copy the rest of the application code
COPY . .

EXPOSE 5173

# Build the React application
RUN npm run build

# Start the application using Vite (development mode or preview mode)
CMD ["npm", "run", "dev"]
# Or use "npm run preview" if you want to run the production build:
# CMD ["npm", "run", "preview"]
