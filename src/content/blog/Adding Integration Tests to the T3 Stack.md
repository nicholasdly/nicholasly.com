---
title: Adding Integration Tests to the T3 Stack
description: How to add unit and integration tests to your T3 application using Vitest.
pubDatetime: 2023-11-11
postSlug: t3-integration-testing
draft: false
featured: false
tags:
  - devlog
  - programming
---

## Table of Contents

## Introduction

Recently, I've been working on [a flashcard web application](https://www.minicards.nicholasly.com/) for my girlfriend, taking inspiration from existing flashcard programs like [Anki](https://ankiweb.net/) and [Quizlet](https://quizlet.com/). I thought it would be the perfect opportunity to try out the [T3 stack](https://create.t3.gg/), and over the last couple weeks and it has quickly become my favorite. The only thing that wasn't "included in the box" was a testing framework, particularly for the [tRPC](https://trpc.io/) routers.

It took a little bit of experimenting, but I'm happy to share that adding integration tests was incredibly straightforward with [Vitest](https://vitest.dev/). Assuming you've already created a project via [create-t3-app](https://create.t3.gg/), let's get straight into it.

## Setting up Vitest

First, go ahead and install Vitest:

```bash
npm install -D vitest
```

If it hasn't automatically created a `vitest.config.ts` file already, go ahead and create one with the following content:

```ts
// vitest.config.ts

import { join } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    env: {
      // add or remove `.env` variables here as enforced by `env.mjs`
      DATABASE_URL: "https://url.com",
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "secret_key",
      CLERK_SECRET_KEY: "secret_key",
      UPSTASH_REDIS_REST_URL: "https://url.com",
      UPSTASH_REDIS_REST_TOKEN: "secret_token",
    },
  },
  resolve: {
    alias: {
      "~/": join(__dirname, "./src/"),
    },
  },
});
```

This just adds an alias to the `src` directory, and adds mock environment variables to get around the `env.mjs` middleware.

> Be sure your environment variables here are considered valid as enforced by your `env.mjs` file. They don't need to be _real_ keys or secrets though.

Afterwards, be sure you create a new script to your `package.json` to run your tests:

```json
// package.json

{
  "name": "minicards",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "next build",
    "db:push": "dotenv drizzle-kit push:mysql",
    "db:studio": "dotenv drizzle-kit studio",
    "dev": "next dev",
    "lint": "next lint",
    "start": "next start",
    "typecheck": "tsc --noEmit",
    "test": "vitest run --reporter verbose" // <---
  },
  ...
}
```

I like using the verbose reporter, but if you aren't a fan feel free to remove `--reporter verbose` to stick with the default reporter. Afterwards, create a new `test` directory at the root of your project. This is where all your testing files go. Feel free to add subdirectories here for further organization. I like to create a new test file for each tRPC router.

Here's what my folder structure looks like, yours should be pretty similar (note that I'm using [Drizzle](https://orm.drizzle.team/) instead of [Prisma](https://www.prisma.io/)):

```
.
├─ public
│  └─ ...
├─ src
│  └─ ...
├─ test
│  ├─ card.test.ts
├─ .env
├─ .env.example
├─ .eslintrc.cjs
├─ .gitignore
├─ README.md
├─ drizzle.config.ts
├─ next.config.mjs
├─ package.json
├─ postcss.config.cjs
├─ prettier.config.mjs
├─ tailwind.config.ts
├─ tsconfig.json
└─ vitest.config.ts
```

I have a tRPC router associated with all actions relating to a MySQL table named `card` I have through [Planetscale](https://planetscale.com/). I've only defined CRUD operations for this example, which I'll provide here for reference when we start writing our tests:

```ts
// ./src/server/api/routers/card.ts

export const cardRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        front: z.string().trim().min(1).max(500),
        back: z.string().trim().min(1).max(500),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(cards).values({
        front: input.front,
        back: input.back,
      });
    }),

  get: publicProcedure
    .input(
      z.object({
        id: z.number().int().positive().finite(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.query.cards.findFirst({
        where: (card, { eq }) => eq(card.id, input.id),
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number().int().positive().finite(),
        front: z.string().trim().min(1).max(500),
        back: z.string().trim().min(1).max(500),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(cards)
        .set({
          front: input.front,
          back: input.back,
        })
        .where(eq(cards.id, input.id));
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.number().int().positive().finite(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(cards).where(eq(cards.id, input.id));
    }),
});
```

## Creating Integration Tests

Now we can finally get to writing the integration tests. Open or create a new test file correlating to the tRPC router you'd like to test. Here, I like using `describe` to organize tests by procedure:

```ts
// test/card.test.ts

import { describe } from "vitest;

describe("create card", () => {
  // tests for the `create` procedure go here
});

describe("get card", () => {
  // tests for the `get` procedure go here
});

describe("update card", () => {
  // tests for the `update` procedure go here
});

describe("delete card", () => {
  // tests for the `delete` procedure go here
});
```

To create a test, it's as simple as using the `test` method. The method itself has a ton of different features, but I'll stick to the basics for this example. If you'd like to learn more, Vitest has great [documentation on their test API](https://vitest.dev/api/).

```ts
import { describe, test } from "vitest;

describe("create card", () => {

  test("card front must be a nonempty string", async () => {
    // arrange
    // act
    // assert
  });

});
```

### Calling tRPC Procedures

To call procedures from our router, we'll need to create a caller. This is pretty straightforward with the `createInnerTRPCContext` and `createCaller` method.

```ts
const ctx = createInnerTRPCContext({ headers: new Headers() });
const caller = appRouter.createCaller(ctx);
```

If you've modified your `CreateContextOptions` interface in the `trpc.ts` file, be sure that's reflected in the arguments you give to `createInnerTRPCContext`. For example, you may have modified it so that the ID of the current user for the current session is included in context:

```ts
interface CreateContextOptions {
  headers: Headers;
  userId: string | null;
}
```

```ts
const ctx = createInnerTRPCContext({
  headers: new Headers(),
  userId: "test user id",
});
const caller = appRouter.createCaller(ctx);
```

### Input and Expected Output

Now that we have a caller, let's establish the input and error. The type for our router input object is easily retrieved with tRPC's `RouterInputs` type:

```ts
const input: RouterInputs["card"]["create"] = {
  front: " ",
  back: "test card back",
};
```

And since we're using [zod](https://github.com/colinhacks/zod) for validation, we can use the `ZodError` class to define an expected error:

```ts
const error = new ZodError([
  {
    code: "too_small",
    minimum: 1,
    type: "string",
    inclusive: true,
    exact: false,
    message: "String must contain at least 1 character(s)",
    path: ["front"],
  },
]);
```

We can finally make our call and assert that our expected error is thrown:

```ts
await expect(caller.card.create(input)).rejects.toThrow(error);
```

## Conclusion

So putting it all together, the test should look like this:

```ts
test("card front must be a nonempty string", async () => {
  const ctx = createInnerTRPCContext({ headers: new Headers() });
  const caller = appRouter.createCaller(ctx);

  const input: RouterInputs["card"]["create"] = {
    front: " ",
    back: "test card back",
  };

  const error = new ZodError([
    {
      code: "too_small",
      minimum: 1,
      type: "string",
      inclusive: true,
      exact: false,
      message: "String must contain at least 1 character(s)",
      path: ["front"],
    },
  ]);

  await expect(caller.card.create(input)).rejects.toThrow(error);
});
```

And that's basically it. Creating integration tests is as simple as creating a caller for your procedures, establishing the input and expected output or error, and giving the procedure a run with assertions.

To run your tests, use the `test` script we defined earlier via `npm run test`. This can also be added to your GitHub workflow so that it runs on a push or pull request.

I hope you found this as useful as I did! Even a couple of integration tests can make the development experience of your next project a lot smoother.
