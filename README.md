<div align="center">
<h1>Next.js GraphQL Prisma Base</h1>
<span>Base repo with [Next.js](https://nextjs.org/), [GraphQL](https://graphql.org/), and [Prisma](https://www.prisma.io/).</span>
</div>

## Development

Clone the repository.

### Install Dependencies

Install dependencies with [yarn](https://yarnpkg.com/).

```bash
yarn
```

### Set Up Database

Fill out `DATABASE_URL` at `.env` (example: `.env.example`).

```bash
# You can set up a local development database with docker compose.
# The default DATABASE_URL in .env.example connects to this db.
docker compose up -d
```

Migrate the database.

```bash
yarn prisma migrate dev --skip-seed
```

Seed some dummy data.

```bash
yarn prisma db seed
```

You can view database tables using [Prisma Studio](https://www.prisma.io/studio).

```bash
yarn prisma studio
```

You can reset the database with:

```bash
yarn prisma migrate reset --skip-seed
```

### Generated Files

Some files (named as `**/*.generated.*`) are automatically generated.

With the generation ordering:

1. Prisma & Nexus Types

   Database types are generated from `src/prisma/schema.prisma` and stored in `node_modules`.

   ```bash
   yarn generate:prisma
   ```

2. GraphQL Schema & Nexus Typings

   After defining the GraphQL schema using `nexus` and `next-nexus` in `src/graphql/schema.ts`,
   we can generate the GraphQL schema file `src/graphql/schema.generated.graphql` and the nexus typings
   `types/nexus-typegen.generated.d.ts` by starting the server and initiating a query.

   ```bash
   yarn dev
   # and open browser http://localhost:3000/api/graphql
   ```
