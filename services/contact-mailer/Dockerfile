FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund

COPY index.js ./

# Runs as a non-root user; it only makes outbound HTTP and SMTP connections.
USER node

CMD ["node", "index.js"]
