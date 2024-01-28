FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

COPY apps/payments apps/payments
COPY libs libs

RUN pnpm install -r

RUN npm run build payments



FROM node:alpine as production 

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install -g pnpm
RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist
COPY proto proto

CMD ["node", "dist/apps/payments/main.js"]