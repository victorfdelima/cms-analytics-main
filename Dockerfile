FROM node:lts as dependencies
WORKDIR /cms-frontend
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM node:lts as builder
WORKDIR /cms-frontend
COPY . .
COPY --from=dependencies /cms-frontend/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /cms-frontend
ENV NODE_ENV production

COPY --from=builder /cms-frontend/next.config.js ./
COPY --from=builder /cms-frontend/public ./public
COPY --from=builder /cms-frontend/.next ./.next
COPY --from=builder /cms-frontend/node_modules ./node_modules
COPY --from=builder /cms-frontend/package.json ./package.json

EXPOSE 3000
CMD ["npm", "run", "start"]
