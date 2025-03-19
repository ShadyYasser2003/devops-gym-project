# المرحلة الأولى: مرحلة البناء (Builder Stage)
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# المرحلة الثانية: مرحلة التشغيل (Runner Stage)
FROM node:18-slim
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/server.js ./
COPY --from=builder /app/public ./public

EXPOSE 3001
CMD [ "node", "server.js" ]
