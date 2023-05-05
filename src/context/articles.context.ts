import { create } from "zustand";

interface Article {
  title: string;
  link: string;
}

interface ArticleStore {
  articles: Article[];
  sentiment: string;
  setData: (data: { articles: Article[]; sentiment: string }) => void;
  updateArticleTitle: (index: number, title: string) => void;
}

const useArticleStore = create<ArticleStore>((set) => ({
  articles: [],
  sentiment: "",
  setData: (data) =>
    set(() => {
      return {
        articles: data.articles,
        sentiment: data.sentiment,
      };
    }),
  // update a single article title by it's index and article
  updateArticleTitle: (index, title) =>
    set((state) => {
      const articles = [...state.articles];
      const article = articles[index] ?? { title: "", link: "" };
      article.title = title;
      articles[index] = article;
      return {
        ...state,
        articles,
      };
    }),
}));

export default useArticleStore;
