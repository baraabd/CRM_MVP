FROM node:20-alpine
WORKDIR /app

# 1) Copy package files first
COPY package*.json ./

# 2) Copy prisma folder BEFORE npm ci (because postinstall runs prisma generate)
COPY prisma ./prisma
# If you use prisma.config.ts, also copy it:
COPY prisma.config.ts ./

# 3) Install deps (postinstall can now find schema)
RUN npm ci

# 4) Copy the rest
COPY . .

# 5) Ensure prisma client is generated (safe even if postinstall already did it)
RUN npx prisma generate

# 6) Build Nest
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/main.js"]
