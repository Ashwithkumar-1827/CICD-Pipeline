# Production-grade Node.js alpine base
FROM node:18-alpine

# Set isolated workspace directory
WORKDIR /app

# Copy manifests
COPY package.json ./

# Install packages
RUN npm install

# Copy application layers
COPY index.js test.js ./

# Run verification suite by default
CMD ["npm", "test"]
