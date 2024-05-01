# stashr

Store and share your thoughts
![stashr](https://github.com/mhmdsami/stashr/assets/78439283/2fe69c3e-057b-45d9-a6ac-c27892933e5e)

## Development Setup

### Fork and clone the repository

- [Fork](https://github.com/mhmdsami/stashr/fork) the repository

```bash
git clone https://github.com/<username>/stashr.git
```

### Install dependencies

```bash
pnpm install
```

### Setup the environment variables

- Create a `.env` file in the root directory (see `.env.example` for an example)

> [!NOTE]  
> Make sure to have `DATABASE_URL` set to your PostgreSQL database URL before running the migrations

### Run the migrations

```bash
pnpm db:migrate
```

### Start the development server

```bash
pnpm dev
```

### Sign Up

![sign-up](https://github.com/mhmdsami/stashr/assets/78439283/1560ce2f-ddd8-43a4-9f41-0a31018d3607)

### Sign In

![sign-in](https://github.com/mhmdsami/stashr/assets/78439283/dc1fa29c-d73e-4d75-a0b1-66fdc18f49d6)

### Dashboard

![dashboard](https://github.com/mhmdsami/stashr/assets/78439283/d4c3e2af-121e-4cd8-a877-e7b30ef42884)

### Note Editor

![editor](https://github.com/mhmdsami/stashr/assets/78439283/4ece3034-84ac-48f0-ae90-ae69596a1c97)

## Tech Stack

- [Remix](https://remix.run/)
- [TailwindCSS](https://tailwindcss.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [drizzle](https://orm.drizzle.team/)
- [TypeScript](https://www.typescriptlang.org/)
- [TipTap](https://www.tiptap.dev/)
