import Link from "next/link";
import { useState } from "react";
import type { FC } from "react";
import useArticleStore from "~/context/articles.context";
import { api } from "~/utils/api";

type ArticleCardProps = {
  index: number;
  article: {
    title: string;
    link: string;
  };
};

const ArticleCard: FC<ArticleCardProps> = ({ index, article }) => {
  const [summary, setSummary] = useState<string>("");
  const updateArticle = useArticleStore((state) => state.updateArticleTitle);

  const { mutate: getSummary } = api.example.getNewsSummary.useMutation({
    onSuccess: (data) => {
      setSummary(data.summary);
    },
  });

  const { mutate: getTranslation } = api.example.getTranslation.useMutation({
    onSuccess: (data) => {
      updateArticle(index, data.translation);
    },
  });

  return (
    <div className="w-50 flex rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="flex w-full flex-col content-between justify-around px-4 py-2 align-middle">
        <a href="#">
          <h5 className="mb-2 items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {article.title}
          </h5>
        </a>
        {summary && (
          <p className="text-gray-700 dark:text-gray-400">{summary}</p>
        )}
        <div className="grid grid-cols-3 gap-5">
          <Link
            target="_blank"
            href={article.link}
            className="flex items-center justify-center rounded-lg bg-blue-700 px-1 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
          </Link>
          <button
            onClick={() => {
              getSummary({ url: article.link });
            }}
            className="rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
          >
            Get summary
          </button>
          <button
            onClick={() => {
              getTranslation({ text: article.title });
            }}
            className="rounded border-b-4 border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:border-blue-500 hover:bg-blue-400"
          >
            Translate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
