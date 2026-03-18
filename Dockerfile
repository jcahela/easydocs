FROM node:20.20-alpine

WORKDIR /app

# Copy root workspace config
COPY package*.json ./

# Copy workspace package files
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install all workspace dependencies
RUN npm install

# Copy all source code
COPY backend ./backend
COPY frontend ./frontend

# Expose ports (both services use same image)
EXPOSE 3000 5173
