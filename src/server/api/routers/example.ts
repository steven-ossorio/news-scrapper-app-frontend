import { z } from "zod";

type Article = {
  title: string;
  link: string;
};

type MutationResponse = {
  articles: Article[];
  sentiment: string;
};

type NewsResponse = {
  articles: Article[];
  sentiment: string;
};

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env.mjs";

export const exampleRouter = createTRPCRouter({
  getAllNewsArticles: publicProcedure
    .input(z.object({ source: z.string(), topic: z.string() }))
    .output(
      z.object({
        articles: z.array(z.object({ title: z.string(), link: z.string() })),
        sentiment: z.string(),
      })
    )
    .mutation(async ({ input }): Promise<MutationResponse> => {
      const res = await fetch(`${env.BACKEND_URL}news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data: NewsResponse = (await res.json()) as NewsResponse;

      return {
        articles: data.articles,
        sentiment: data.sentiment,
      };
    }),

  getNewsSummary: publicProcedure
    .input(z.object({ url: z.string() }))
    .output(
      z.object({
        summary: z.string(),
      })
    )
    .mutation(async ({ input }): Promise<{ summary: string }> => {
      const res = await fetch(`${env.BACKEND_URL}/summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data: { summary: string } = (await res.json()) as {
        summary: string;
      };

      return {
        summary: data.summary,
      };
    }),

  getTranslation: publicProcedure
    .input(z.object({ text: z.string() }))
    .output(
      z.object({
        translation: z.string(),
      })
    )
    .mutation(async ({ input }): Promise<{ translation: string }> => {
      const res = await fetch(`${env.BACKEND_URL}translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input.text,
          language: "spanish",
        }),
      });

      const data: { translation: string } = (await res.json()) as {
        translation: string;
      };

      return {
        translation: data.translation,
      };
    }),
});
