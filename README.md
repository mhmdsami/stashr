# stashr

Store and share your thoughts
![stashr](https://github.com/mhmdsami/stashr/assets/78439283/379ee05c-91b4-4cd9-9579-695ad653a746)

## Development Setup

### Fork and clone the repository

- [Fork](https://github.com/mhmdsami/stashr/fork) the repository

```bash
git clone https://github.com/<username>/feedback-api
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

![sign-up](https://github.com/mhmdsami/stashr/assets/78439283/b5bdafe7-f3b1-4a59-b747-5c969a51a404)

### Sign In

![sign-in](https://github.com/mhmdsami/stashr/assets/78439283/2405685e-8f0b-48fc-97be-c689148c87b4)

### Dashboard

![dashboard](https://github.com/mhmdsami/stashr/assets/78439283/6d0dac77-5266-4bf6-80da-31a0fadf8b9d)

### Note Editor

![editor](https://github.com/mhmdsami/stashr/assets/78439283/10202ca0-a14a-479b-b18a-01206ffdb8d2)

## Tech Stack

- [Remix](https://remix.run/)
- [TailwindCSS](https://tailwindcss.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [drizzle](https://orm.drizzle.team/)
- [TypeScript](https://www.typescriptlang.org/)
- [TipTap](https://www.tiptap.dev/)
