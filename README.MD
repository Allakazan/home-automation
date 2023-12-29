## Allpunks Home Automation

### About

This is the the core for my Home Automation solution.

### Dependencies

- [NodeJS LTS](https://nodejs.org)
- [Docker](https://docker.com)

### Instructions

#### Install dependencies

Run this inside api and client folders

```bash
$ npm install
```

#### Build

Run this inside api folder only

```bash
$ npm run build
```

#### Start containers

Run this on project root folder

```bash
$ docker-compose build
```

```bash
$ docker-compose up -d
```

Now you are ready to go ;)

### Prisma Stuff (api local only)

#### Prisma Studio

```bash
$ npm rum prisma:studio
```

#### Migrate

Before running a migration localy please stop the docker container for the api

```bash
$ npm rum prisma:migrate
```

#### Seed

```bash
$ npm rum prisma:seed
```
