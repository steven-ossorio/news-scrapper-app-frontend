import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useState } from "react";
import useArticleStore from "~/context/articles.context";
import { LoadingPage } from "~/components/Spinner";
import ArticleCard from "~/components/ArticleCard";

const Home: NextPage = () => {
  const setData = useArticleStore((state) => state.setData);
  const articles = useArticleStore((state) => state.articles);
  const sentiment = useArticleStore((state) => state.sentiment);

  const { mutate, isLoading } = api.example.getAllNewsArticles.useMutation({
    onSuccess: (data) => {
      setData({ articles: data.articles, sentiment: data.sentiment });
    },
  });

  const [cnnTopic, setCnnTopic] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (cnnTopic === event.target.name) {
      return;
    }
    setCnnTopic(event.target.name);

    const [source = "", topic = ""] = event.target.id.split("-");

    mutate({
      source: source,
      topic: topic,
    });
  };

  return (
    <>
      <Head>
        <title>NewsScrapper - Number 1 source of news</title>
        <meta
          name="description"
          content="Scrap news articles from different websites"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
          Choose Articles to view:
        </h3>
        <ul className="grid w-full gap-6 md:grid-cols-3">
          <li>
            <input
              type="checkbox"
              id="cnn-entertainment"
              name="cnn-entertainment"
              className="peer hidden"
              checked={cnnTopic === "cnn-entertainment"}
              onChange={handleChange}
            />
            <label
              htmlFor="cnn-entertainment"
              className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300"
            >
              <div className="block">
                <svg
                  className="mb-2 h-14 w-14 text-sky-500"
                  fill="#c00"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 120"
                >
                  <path d="M20.17 30.013c0 8.003 6.5 14.513 14.513 14.513H48.24c.85 0 1.512-.8 1.512-1.506V16.425a3.05 3.05 0 0 1 3.047-3.047 3.04 3.04 0 0 1 2.62 1.492l17.03 29.362a1.27 1.27 0 0 0 2.349-.657v-27.15a3.05 3.05 0 0 1 3.047-3.047 3.04 3.04 0 0 1 2.62 1.492l17.013 29.36a1.27 1.27 0 0 0 2.349-.656v-35.2h-5.343v20.952l-9.995-17.2c-1.413-2.416-4.093-3.942-6.946-3.942-4.468 0-8.1 3.625-8.1 8.093v13.05l-9.995-17.2c-1.417-2.415-4.097-3.94-6.947-3.94-4.468 0-8.1 3.625-8.1 8.093v21.44c.003.78-.584 1.46-1.438 1.462h-8.24a9.17 9.17 0 0 1 0-18.34h6.902V15.5h-6.96C26.68 15.5 20.17 22 20.17 30.013m81.435-21.637v35.2a3.05 3.05 0 0 1-3.047 3.047 3.04 3.04 0 0 1-2.62-1.491L78.923 15.77a1.27 1.27 0 0 0-2.349.656v27.15a3.05 3.05 0 0 1-3.047 3.047 3.03 3.03 0 0 1-2.62-1.5L53.878 15.77c-.217-.37-.642-.6-1.083-.6a1.27 1.27 0 0 0-1.266 1.266V43.02c0 1.75-1.538 3.287-3.292 3.287H34.682a16.31 16.31 0 0 1-16.294-16.294 16.31 16.31 0 0 1 16.294-16.294h6.96V8.376H34.7c-11.95 0-21.638 9.687-21.638 21.638S22.74 51.652 34.7 51.652h13.686c5.184.003 8.518-3.035 8.5-8.638V30.672l9.995 17.2c1.413 2.416 4.093 3.942 6.946 3.942 4.468 0 8.1-3.625 8.1-8.092v-13.05l9.995 17.2c1.414 2.416 4.094 3.942 6.946 3.942 4.468 0 8.1-3.625 8.1-8.092V8.376z" />
                </svg>

                <div className="w-full text-lg font-semibold">
                  Entertainment
                </div>
                <div className="w-full text-sm">
                  CNN Entertainment covers the latest news and trends in the
                  entertainment industry
                </div>
              </div>
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              id="cnn-business"
              name="cnn-business"
              className="peer hidden"
              checked={cnnTopic === "cnn-business"}
              onChange={handleChange}
            />
            <label
              htmlFor="cnn-business"
              className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300"
            >
              <div className="block">
                <svg
                  className="mb-2 h-14 w-14 text-sky-500"
                  fill="#c00"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 120"
                >
                  <path d="M20.17 30.013c0 8.003 6.5 14.513 14.513 14.513H48.24c.85 0 1.512-.8 1.512-1.506V16.425a3.05 3.05 0 0 1 3.047-3.047 3.04 3.04 0 0 1 2.62 1.492l17.03 29.362a1.27 1.27 0 0 0 2.349-.657v-27.15a3.05 3.05 0 0 1 3.047-3.047 3.04 3.04 0 0 1 2.62 1.492l17.013 29.36a1.27 1.27 0 0 0 2.349-.656v-35.2h-5.343v20.952l-9.995-17.2c-1.413-2.416-4.093-3.942-6.946-3.942-4.468 0-8.1 3.625-8.1 8.093v13.05l-9.995-17.2c-1.417-2.415-4.097-3.94-6.947-3.94-4.468 0-8.1 3.625-8.1 8.093v21.44c.003.78-.584 1.46-1.438 1.462h-8.24a9.17 9.17 0 0 1 0-18.34h6.902V15.5h-6.96C26.68 15.5 20.17 22 20.17 30.013m81.435-21.637v35.2a3.05 3.05 0 0 1-3.047 3.047 3.04 3.04 0 0 1-2.62-1.491L78.923 15.77a1.27 1.27 0 0 0-2.349.656v27.15a3.05 3.05 0 0 1-3.047 3.047 3.03 3.03 0 0 1-2.62-1.5L53.878 15.77c-.217-.37-.642-.6-1.083-.6a1.27 1.27 0 0 0-1.266 1.266V43.02c0 1.75-1.538 3.287-3.292 3.287H34.682a16.31 16.31 0 0 1-16.294-16.294 16.31 16.31 0 0 1 16.294-16.294h6.96V8.376H34.7c-11.95 0-21.638 9.687-21.638 21.638S22.74 51.652 34.7 51.652h13.686c5.184.003 8.518-3.035 8.5-8.638V30.672l9.995 17.2c1.413 2.416 4.093 3.942 6.946 3.942 4.468 0 8.1-3.625 8.1-8.092v-13.05l9.995 17.2c1.414 2.416 4.094 3.942 6.946 3.942 4.468 0 8.1-3.625 8.1-8.092V8.376z" />
                </svg>

                <div className="w-full text-lg font-semibold">Business</div>
                <div className="w-full text-sm">
                  CNN Business is a news platform that covers the latest
                  business news,
                </div>
              </div>
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              id="cnn-politics"
              name="cnn-politics"
              className="peer hidden"
              checked={cnnTopic === "cnn-politics"}
              onChange={handleChange}
            />
            <label
              htmlFor="cnn-politics"
              className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300"
            >
              <div className="block">
                <svg
                  className="mb-2 h-14 w-14 text-sky-500"
                  fill="#c00"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 120"
                >
                  <path d="M20.17 30.013c0 8.003 6.5 14.513 14.513 14.513H48.24c.85 0 1.512-.8 1.512-1.506V16.425a3.05 3.05 0 0 1 3.047-3.047 3.04 3.04 0 0 1 2.62 1.492l17.03 29.362a1.27 1.27 0 0 0 2.349-.657v-27.15a3.05 3.05 0 0 1 3.047-3.047 3.04 3.04 0 0 1 2.62 1.492l17.013 29.36a1.27 1.27 0 0 0 2.349-.656v-35.2h-5.343v20.952l-9.995-17.2c-1.413-2.416-4.093-3.942-6.946-3.942-4.468 0-8.1 3.625-8.1 8.093v13.05l-9.995-17.2c-1.417-2.415-4.097-3.94-6.947-3.94-4.468 0-8.1 3.625-8.1 8.093v21.44c.003.78-.584 1.46-1.438 1.462h-8.24a9.17 9.17 0 0 1 0-18.34h6.902V15.5h-6.96C26.68 15.5 20.17 22 20.17 30.013m81.435-21.637v35.2a3.05 3.05 0 0 1-3.047 3.047 3.04 3.04 0 0 1-2.62-1.491L78.923 15.77a1.27 1.27 0 0 0-2.349.656v27.15a3.05 3.05 0 0 1-3.047 3.047 3.03 3.03 0 0 1-2.62-1.5L53.878 15.77c-.217-.37-.642-.6-1.083-.6a1.27 1.27 0 0 0-1.266 1.266V43.02c0 1.75-1.538 3.287-3.292 3.287H34.682a16.31 16.31 0 0 1-16.294-16.294 16.31 16.31 0 0 1 16.294-16.294h6.96V8.376H34.7c-11.95 0-21.638 9.687-21.638 21.638S22.74 51.652 34.7 51.652h13.686c5.184.003 8.518-3.035 8.5-8.638V30.672l9.995 17.2c1.413 2.416 4.093 3.942 6.946 3.942 4.468 0 8.1-3.625 8.1-8.092v-13.05l9.995 17.2c1.414 2.416 4.094 3.942 6.946 3.942 4.468 0 8.1-3.625 8.1-8.092V8.376z" />
                </svg>

                <div className="w-full text-lg font-semibold">Politics</div>
                <div className="w-full text-sm">
                  CNN Politics, your own stop to seeing where the government is
                  headed and how it affects you.
                </div>
              </div>
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              id="skysports-f1"
              name="skysports-f1"
              className="peer hidden"
              checked={cnnTopic === "skysports-f1"}
              onChange={handleChange}
            />
            <label
              htmlFor="skysports-f1"
              className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300"
            >
              <div className="block">
                <svg
                  className="mb-2 h-20 w-20 text-sky-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="2500"
                  height="407"
                  viewBox="0.003 0 491.18 80.001"
                >
                  <path
                    d="M145.83.001H7.27C3.272.001.002 3.27.002 7.267v65.471c0 3.996 3.27 7.263 7.268 7.263l138.56-.009V.001z"
                    fill="#0e2d6d"
                  />
                  <linearGradient
                    id="a"
                    gradientUnits="userSpaceOnUse"
                    x1="-2153.62"
                    y1="447.676"
                    x2="-2153.62"
                    y2="409.955"
                    gradientTransform="matrix(1 0 0 -1 2229.395 449.36)"
                  >
                    <stop offset="0" stopColor="#fff" />
                    <stop offset=".039" stopColor="#e7ecf5" />
                    <stop offset=".122" stopColor="#bacae4" />
                    <stop offset=".21" stopColor="#93acd4" />
                    <stop offset=".303" stopColor="#7293c7" />
                    <stop offset=".403" stopColor="#577ebc" />
                    <stop offset=".51" stopColor="#426eb3" />
                    <stop offset=".631" stopColor="#3363ae" />
                    <stop offset=".774" stopColor="#2b5caa" />
                    <stop offset="1" stopColor="#285aa9" />
                  </linearGradient>
                  <path
                    d="M145.83 1.684H5.72s3.062 16.504 22.383 30.342c0 0 9.891 7.446 16.334 7.379h101.39V1.684h.003z"
                    opacity=".8"
                    fill="url(#a)"
                  />
                  <linearGradient
                    id="b"
                    gradientUnits="userSpaceOnUse"
                    x1="-1910.889"
                    y1="369.371"
                    x2="-1910.889"
                    y2="449.359"
                    gradientTransform="matrix(1 0 0 -1 2229.395 449.36)"
                  >
                    <stop offset="0" stopColor="#d92231" />
                    <stop offset=".193" stopColor="#d12130" />
                    <stop offset=".448" stopColor="#bd1f2c" />
                    <stop offset=".735" stopColor="#9d1a26" />
                    <stop offset="1" stopColor="#7c131d" />
                  </linearGradient>
                  <path
                    d="M145.83 79.988l338.09-.006c3.991 0 7.263-3.267 7.263-7.262V7.266c0-3.997-3.272-7.266-7.263-7.266H145.83v79.988z"
                    fill="url(#b)"
                  />
                  <linearGradient
                    id="c"
                    gradientUnits="userSpaceOnUse"
                    x1="-1913.77"
                    y1="447.676"
                    x2="-1913.77"
                    y2="409.955"
                    gradientTransform="matrix(1 0 0 -1 2229.395 449.36)"
                  >
                    <stop offset="0" stopColor="#fff" />
                    <stop offset=".048" stopColor="#fae1e3" />
                    <stop offset=".13" stopColor="#f2b4b9" />
                    <stop offset=".217" stopColor="#eb8d95" />
                    <stop offset=".31" stopColor="#e66c76" />
                    <stop offset=".408" stopColor="#e1515d" />
                    <stop offset=".515" stopColor="#dd3c49" />
                    <stop offset=".634" stopColor="#db2d3b" />
                    <stop offset=".776" stopColor="#d92533" />
                    <stop offset="1" stopColor="#d92231" />
                  </linearGradient>
                  <path
                    d="M145.83 1.684h339.59s-3.062 16.504-22.379 30.342c0 0-9.898 7.446-14.05 7.379h-303.16l-.001-37.721z"
                    opacity=".8"
                    fill="url(#c)"
                  />
                  <path
                    d="M96.311 74.296c.951.489 2.883 1.069 5.303 1.136 4.171.088 6.439-1.507 8.123-5.242l22.349-49.844c-.921-.491-2.975-1.042-4.63-1.074-2.881-.061-6.744.522-9.194 6.409l-7.221 17.07L96.845 19.64c-.92-.276-3.157-.675-4.784-.675-5.025 0-7.815 1.838-10.728 4.997L67.54 39.045l11.096 17.469c2.054 3.188 4.753 4.813 9.136 4.813 2.882 0 5.272-.671 6.375-1.193l-13.365-20.14 9.472-10.055 15.542 24.399-9.469 19.958h-.016zM66.993 55.441c0 3.678-1.441 5.797-8.614 5.797-.95 0-1.776-.065-2.574-.188V12.314c0-3.709 1.256-7.573 8.49-7.573.921 0 1.839.094 2.698.276v50.424zm-14.795-7.355c0 6.865-4.476 11.861-13.581 12.844-6.59.707-16.123-.123-20.659-.644-.154-.737-.276-1.654-.276-2.392 0-5.979 3.218-7.355 6.252-7.355 3.158 0 8.125.55 11.804.55 4.075 0 5.301-1.381 5.301-2.696 0-1.719-1.623-2.42-4.781-3.035l-8.645-1.655c-7.173-1.382-11.004-6.346-11.004-11.619 0-6.404 4.536-11.77 13.457-12.75 6.744-.737 14.958.09 19.466.642.152.767.244 1.501.244 2.299 0 5.978-3.157 7.265-6.192 7.265-2.33 0-5.944-.429-10.085-.429-4.201 0-5.946 1.166-5.946 2.574 0 1.502 1.653 2.114 4.292 2.574l8.245 1.534c8.46 1.562 12.108 6.375 12.108 12.293zM209.23 51.404c0-8.58-5.586-12.753-14.482-14.72l-15.585-3.539c-2.833-.63-5.195-1.498-5.195-4.33 0-3.07 2.441-4.25 8.973-4.25 7.715 0 9.525.393 16.53.393 3.229 0 6.532-1.497 6.532-7.871 0-.789-.075-1.655-.233-2.442-4.725-.392-13.146-.865-23.534-.865-15.664 0-21.647 6.77-21.647 15.427 0 8.107 5.118 12.598 14.169 14.721l15.583 3.619c3.622.862 5.591 2.439 5.591 4.723 0 3.07-2.755 4.252-9.287 4.252-7.712 0-11.255-.549-18.262-.549-3.228 0-6.532 1.491-6.532 7.868 0 .787.079 1.651.235 2.44 4.726.469 14.877 1.023 25.265 1.023 15.67-.002 21.89-6.691 21.89-15.9h-.011zM337.841 37.551V24.408h12.355c5.277 0 9.447.784 9.447 6.294 0 4.641-3.147 6.849-9.447 6.849h-12.363.008zm-.081 10.388h6.53l12.612 15.033c2.354 2.912 4.642 4.409 9.994 4.409 3.621 0 6.06-.471 8.022-1.419l-16.382-18.965c9.212-1.967 13.854-7.953 13.854-16.767 0-10.862-6.614-16.214-19.991-16.214l-19.125-.077c-6.216.235-8.268 2.359-8.268 8.027v44.551c.942.156 2.052.231 3.15.231 7.869 0 9.679-2.278 9.679-6.372l-.06-12.438h-.015zM227.72 38.968V24.485h12.828c6.38 0 9.529 2.361 9.529 7.007 0 4.96-3.149 7.477-9.529 7.477l-12.828-.001zm-12.83 27.55c.946.157 2.05.232 3.147.232 7.874 0 9.683-2.277 9.683-6.372V49.594h13.38c14.562 0 21.803-6.295 21.803-18.102 0-11.414-7.241-17.475-20.936-17.475h-18.814c-6.295 0-8.263 2.44-8.263 8.028v44.473zM305.49 39.598c0 6.064-1.022 10.308-3.069 12.83-1.967 2.596-5.197 3.778-9.604 3.778-4.487-.081-7.709-1.338-9.76-3.778-2.042-2.439-3.068-6.689-3.068-12.83 0-6.06 1.103-10.31 3.147-12.751 2.047-2.519 5.273-3.699 9.68-3.699s7.557 1.18 9.604 3.699c2.04 2.441 3.07 6.691 3.07 12.751zm-12.68 27.077c8.263 0 14.642-1.967 19.13-5.981 4.481-3.938 6.77-11.022 6.77-21.095-.084-9.915-2.363-16.844-7.007-20.938-4.647-4.015-10.939-6.059-18.894-6.059-7.948 0-14.247 2.044-18.891 6.059-4.643 4.094-6.928 11.022-7.007 20.938 0 10.073 2.284 17.158 6.771 21.095 4.489 4.015 10.87 5.981 19.13 5.981h-.002zM406.24 24.802h10.312c3.386 0 6.844-1.575 6.844-8.269 0-.784-.076-1.73-.234-2.516h-40.061c-3.385 0-6.851 1.575-6.851 8.263 0 .79.08 1.731.242 2.522h16.919v41.715c.947.156 2.046.231 3.15.231 7.865 0 9.679-2.278 9.679-6.372V24.802zM473.69 51.404c0-8.58-5.595-12.753-14.483-14.72l-15.586-3.539c-2.834-.63-5.195-1.498-5.195-4.33 0-3.07 2.438-4.25 8.971-4.25 7.717 0 9.528.393 16.53.393 3.23 0 6.534-1.497 6.534-7.871 0-.789-.072-1.655-.232-2.442-4.725-.392-13.146-.865-23.538-.865-15.66 0-21.646 6.77-21.646 15.427 0 8.107 5.117 12.598 14.17 14.721l15.584 3.619c3.623.862 5.59 2.439 5.59 4.723 0 3.07-2.757 4.252-9.286 4.252-7.714 0-11.254-.549-18.267-.549-3.227 0-6.531 1.491-6.531 7.868 0 .787.079 1.651.238 2.44 4.72.469 14.875 1.023 25.266 1.023 15.67-.002 21.89-6.691 21.89-15.9h-.009z"
                    fill="#fff"
                  />
                </svg>
                <div className="w-full text-lg font-semibold">F1</div>
                <div className="w-full text-sm">All news about Formula 1</div>
              </div>
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              id="skysports-nba"
              name="skysports-nba"
              className="peer hidden"
              checked={cnnTopic === "skysports-nba"}
              onChange={handleChange}
            />
            <label
              htmlFor="skysports-nba"
              className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300"
            >
              <div className="block">
                <svg
                  className="mb-2 h-20 w-20 text-sky-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="2500"
                  height="407"
                  viewBox="0.003 0 491.18 80.001"
                >
                  <path
                    d="M145.83.001H7.27C3.272.001.002 3.27.002 7.267v65.471c0 3.996 3.27 7.263 7.268 7.263l138.56-.009V.001z"
                    fill="#0e2d6d"
                  />
                  <linearGradient
                    id="a"
                    gradientUnits="userSpaceOnUse"
                    x1="-2153.62"
                    y1="447.676"
                    x2="-2153.62"
                    y2="409.955"
                    gradientTransform="matrix(1 0 0 -1 2229.395 449.36)"
                  >
                    <stop offset="0" stopColor="#fff" />
                    <stop offset=".039" stopColor="#e7ecf5" />
                    <stop offset=".122" stopColor="#bacae4" />
                    <stop offset=".21" stopColor="#93acd4" />
                    <stop offset=".303" stopColor="#7293c7" />
                    <stop offset=".403" stopColor="#577ebc" />
                    <stop offset=".51" stopColor="#426eb3" />
                    <stop offset=".631" stopColor="#3363ae" />
                    <stop offset=".774" stopColor="#2b5caa" />
                    <stop offset="1" stopColor="#285aa9" />
                  </linearGradient>
                  <path
                    d="M145.83 1.684H5.72s3.062 16.504 22.383 30.342c0 0 9.891 7.446 16.334 7.379h101.39V1.684h.003z"
                    opacity=".8"
                    fill="url(#a)"
                  />
                  <linearGradient
                    id="b"
                    gradientUnits="userSpaceOnUse"
                    x1="-1910.889"
                    y1="369.371"
                    x2="-1910.889"
                    y2="449.359"
                    gradientTransform="matrix(1 0 0 -1 2229.395 449.36)"
                  >
                    <stop offset="0" stopColor="#d92231" />
                    <stop offset=".193" stopColor="#d12130" />
                    <stop offset=".448" stopColor="#bd1f2c" />
                    <stop offset=".735" stopColor="#9d1a26" />
                    <stop offset="1" stopColor="#7c131d" />
                  </linearGradient>
                  <path
                    d="M145.83 79.988l338.09-.006c3.991 0 7.263-3.267 7.263-7.262V7.266c0-3.997-3.272-7.266-7.263-7.266H145.83v79.988z"
                    fill="url(#b)"
                  />
                  <linearGradient
                    id="c"
                    gradientUnits="userSpaceOnUse"
                    x1="-1913.77"
                    y1="447.676"
                    x2="-1913.77"
                    y2="409.955"
                    gradientTransform="matrix(1 0 0 -1 2229.395 449.36)"
                  >
                    <stop offset="0" stopColor="#fff" />
                    <stop offset=".048" stopColor="#fae1e3" />
                    <stop offset=".13" stopColor="#f2b4b9" />
                    <stop offset=".217" stopColor="#eb8d95" />
                    <stop offset=".31" stopColor="#e66c76" />
                    <stop offset=".408" stopColor="#e1515d" />
                    <stop offset=".515" stopColor="#dd3c49" />
                    <stop offset=".634" stopColor="#db2d3b" />
                    <stop offset=".776" stopColor="#d92533" />
                    <stop offset="1" stopColor="#d92231" />
                  </linearGradient>
                  <path
                    d="M145.83 1.684h339.59s-3.062 16.504-22.379 30.342c0 0-9.898 7.446-14.05 7.379h-303.16l-.001-37.721z"
                    opacity=".8"
                    fill="url(#c)"
                  />
                  <path
                    d="M96.311 74.296c.951.489 2.883 1.069 5.303 1.136 4.171.088 6.439-1.507 8.123-5.242l22.349-49.844c-.921-.491-2.975-1.042-4.63-1.074-2.881-.061-6.744.522-9.194 6.409l-7.221 17.07L96.845 19.64c-.92-.276-3.157-.675-4.784-.675-5.025 0-7.815 1.838-10.728 4.997L67.54 39.045l11.096 17.469c2.054 3.188 4.753 4.813 9.136 4.813 2.882 0 5.272-.671 6.375-1.193l-13.365-20.14 9.472-10.055 15.542 24.399-9.469 19.958h-.016zM66.993 55.441c0 3.678-1.441 5.797-8.614 5.797-.95 0-1.776-.065-2.574-.188V12.314c0-3.709 1.256-7.573 8.49-7.573.921 0 1.839.094 2.698.276v50.424zm-14.795-7.355c0 6.865-4.476 11.861-13.581 12.844-6.59.707-16.123-.123-20.659-.644-.154-.737-.276-1.654-.276-2.392 0-5.979 3.218-7.355 6.252-7.355 3.158 0 8.125.55 11.804.55 4.075 0 5.301-1.381 5.301-2.696 0-1.719-1.623-2.42-4.781-3.035l-8.645-1.655c-7.173-1.382-11.004-6.346-11.004-11.619 0-6.404 4.536-11.77 13.457-12.75 6.744-.737 14.958.09 19.466.642.152.767.244 1.501.244 2.299 0 5.978-3.157 7.265-6.192 7.265-2.33 0-5.944-.429-10.085-.429-4.201 0-5.946 1.166-5.946 2.574 0 1.502 1.653 2.114 4.292 2.574l8.245 1.534c8.46 1.562 12.108 6.375 12.108 12.293zM209.23 51.404c0-8.58-5.586-12.753-14.482-14.72l-15.585-3.539c-2.833-.63-5.195-1.498-5.195-4.33 0-3.07 2.441-4.25 8.973-4.25 7.715 0 9.525.393 16.53.393 3.229 0 6.532-1.497 6.532-7.871 0-.789-.075-1.655-.233-2.442-4.725-.392-13.146-.865-23.534-.865-15.664 0-21.647 6.77-21.647 15.427 0 8.107 5.118 12.598 14.169 14.721l15.583 3.619c3.622.862 5.591 2.439 5.591 4.723 0 3.07-2.755 4.252-9.287 4.252-7.712 0-11.255-.549-18.262-.549-3.228 0-6.532 1.491-6.532 7.868 0 .787.079 1.651.235 2.44 4.726.469 14.877 1.023 25.265 1.023 15.67-.002 21.89-6.691 21.89-15.9h-.011zM337.841 37.551V24.408h12.355c5.277 0 9.447.784 9.447 6.294 0 4.641-3.147 6.849-9.447 6.849h-12.363.008zm-.081 10.388h6.53l12.612 15.033c2.354 2.912 4.642 4.409 9.994 4.409 3.621 0 6.06-.471 8.022-1.419l-16.382-18.965c9.212-1.967 13.854-7.953 13.854-16.767 0-10.862-6.614-16.214-19.991-16.214l-19.125-.077c-6.216.235-8.268 2.359-8.268 8.027v44.551c.942.156 2.052.231 3.15.231 7.869 0 9.679-2.278 9.679-6.372l-.06-12.438h-.015zM227.72 38.968V24.485h12.828c6.38 0 9.529 2.361 9.529 7.007 0 4.96-3.149 7.477-9.529 7.477l-12.828-.001zm-12.83 27.55c.946.157 2.05.232 3.147.232 7.874 0 9.683-2.277 9.683-6.372V49.594h13.38c14.562 0 21.803-6.295 21.803-18.102 0-11.414-7.241-17.475-20.936-17.475h-18.814c-6.295 0-8.263 2.44-8.263 8.028v44.473zM305.49 39.598c0 6.064-1.022 10.308-3.069 12.83-1.967 2.596-5.197 3.778-9.604 3.778-4.487-.081-7.709-1.338-9.76-3.778-2.042-2.439-3.068-6.689-3.068-12.83 0-6.06 1.103-10.31 3.147-12.751 2.047-2.519 5.273-3.699 9.68-3.699s7.557 1.18 9.604 3.699c2.04 2.441 3.07 6.691 3.07 12.751zm-12.68 27.077c8.263 0 14.642-1.967 19.13-5.981 4.481-3.938 6.77-11.022 6.77-21.095-.084-9.915-2.363-16.844-7.007-20.938-4.647-4.015-10.939-6.059-18.894-6.059-7.948 0-14.247 2.044-18.891 6.059-4.643 4.094-6.928 11.022-7.007 20.938 0 10.073 2.284 17.158 6.771 21.095 4.489 4.015 10.87 5.981 19.13 5.981h-.002zM406.24 24.802h10.312c3.386 0 6.844-1.575 6.844-8.269 0-.784-.076-1.73-.234-2.516h-40.061c-3.385 0-6.851 1.575-6.851 8.263 0 .79.08 1.731.242 2.522h16.919v41.715c.947.156 2.046.231 3.15.231 7.865 0 9.679-2.278 9.679-6.372V24.802zM473.69 51.404c0-8.58-5.595-12.753-14.483-14.72l-15.586-3.539c-2.834-.63-5.195-1.498-5.195-4.33 0-3.07 2.438-4.25 8.971-4.25 7.717 0 9.528.393 16.53.393 3.23 0 6.534-1.497 6.534-7.871 0-.789-.072-1.655-.232-2.442-4.725-.392-13.146-.865-23.538-.865-15.66 0-21.646 6.77-21.646 15.427 0 8.107 5.117 12.598 14.17 14.721l15.584 3.619c3.623.862 5.59 2.439 5.59 4.723 0 3.07-2.757 4.252-9.286 4.252-7.714 0-11.254-.549-18.267-.549-3.227 0-6.531 1.491-6.531 7.868 0 .787.079 1.651.238 2.44 4.72.469 14.875 1.023 25.266 1.023 15.67-.002 21.89-6.691 21.89-15.9h-.009z"
                    fill="#fff"
                  />
                </svg>
                <div className="w-full text-lg font-semibold">NBA</div>
                <div className="w-full text-sm">All news about NBA</div>
              </div>
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              id="skysports-nfl"
              name="skysports-nfl"
              className="peer hidden"
              checked={cnnTopic === "skysports-nfl"}
              onChange={handleChange}
            />
            <label
              htmlFor="skysports-nfl"
              className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300"
            >
              <div className="block">
                <svg
                  className="mb-2 h-20 w-20 text-sky-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="2500"
                  height="407"
                  viewBox="0.003 0 491.18 80.001"
                >
                  <path
                    d="M145.83.001H7.27C3.272.001.002 3.27.002 7.267v65.471c0 3.996 3.27 7.263 7.268 7.263l138.56-.009V.001z"
                    fill="#0e2d6d"
                  />
                  <linearGradient
                    id="a"
                    gradientUnits="userSpaceOnUse"
                    x1="-2153.62"
                    y1="447.676"
                    x2="-2153.62"
                    y2="409.955"
                    gradientTransform="matrix(1 0 0 -1 2229.395 449.36)"
                  >
                    <stop offset="0" stopColor="#fff" />
                    <stop offset=".039" stopColor="#e7ecf5" />
                    <stop offset=".122" stopColor="#bacae4" />
                    <stop offset=".21" stopColor="#93acd4" />
                    <stop offset=".303" stopColor="#7293c7" />
                    <stop offset=".403" stopColor="#577ebc" />
                    <stop offset=".51" stopColor="#426eb3" />
                    <stop offset=".631" stopColor="#3363ae" />
                    <stop offset=".774" stopColor="#2b5caa" />
                    <stop offset="1" stopColor="#285aa9" />
                  </linearGradient>
                  <path
                    d="M145.83 1.684H5.72s3.062 16.504 22.383 30.342c0 0 9.891 7.446 16.334 7.379h101.39V1.684h.003z"
                    opacity=".8"
                    fill="url(#a)"
                  />
                  <linearGradient
                    id="b"
                    gradientUnits="userSpaceOnUse"
                    x1="-1910.889"
                    y1="369.371"
                    x2="-1910.889"
                    y2="449.359"
                    gradientTransform="matrix(1 0 0 -1 2229.395 449.36)"
                  >
                    <stop offset="0" stopColor="#d92231" />
                    <stop offset=".193" stopColor="#d12130" />
                    <stop offset=".448" stopColor="#bd1f2c" />
                    <stop offset=".735" stopColor="#9d1a26" />
                    <stop offset="1" stopColor="#7c131d" />
                  </linearGradient>
                  <path
                    d="M145.83 79.988l338.09-.006c3.991 0 7.263-3.267 7.263-7.262V7.266c0-3.997-3.272-7.266-7.263-7.266H145.83v79.988z"
                    fill="url(#b)"
                  />
                  <linearGradient
                    id="c"
                    gradientUnits="userSpaceOnUse"
                    x1="-1913.77"
                    y1="447.676"
                    x2="-1913.77"
                    y2="409.955"
                    gradientTransform="matrix(1 0 0 -1 2229.395 449.36)"
                  >
                    <stop offset="0" stopColor="#fff" />
                    <stop offset=".048" stopColor="#fae1e3" />
                    <stop offset=".13" stopColor="#f2b4b9" />
                    <stop offset=".217" stopColor="#eb8d95" />
                    <stop offset=".31" stopColor="#e66c76" />
                    <stop offset=".408" stopColor="#e1515d" />
                    <stop offset=".515" stopColor="#dd3c49" />
                    <stop offset=".634" stopColor="#db2d3b" />
                    <stop offset=".776" stopColor="#d92533" />
                    <stop offset="1" stopColor="#d92231" />
                  </linearGradient>
                  <path
                    d="M145.83 1.684h339.59s-3.062 16.504-22.379 30.342c0 0-9.898 7.446-14.05 7.379h-303.16l-.001-37.721z"
                    opacity=".8"
                    fill="url(#c)"
                  />
                  <path
                    d="M96.311 74.296c.951.489 2.883 1.069 5.303 1.136 4.171.088 6.439-1.507 8.123-5.242l22.349-49.844c-.921-.491-2.975-1.042-4.63-1.074-2.881-.061-6.744.522-9.194 6.409l-7.221 17.07L96.845 19.64c-.92-.276-3.157-.675-4.784-.675-5.025 0-7.815 1.838-10.728 4.997L67.54 39.045l11.096 17.469c2.054 3.188 4.753 4.813 9.136 4.813 2.882 0 5.272-.671 6.375-1.193l-13.365-20.14 9.472-10.055 15.542 24.399-9.469 19.958h-.016zM66.993 55.441c0 3.678-1.441 5.797-8.614 5.797-.95 0-1.776-.065-2.574-.188V12.314c0-3.709 1.256-7.573 8.49-7.573.921 0 1.839.094 2.698.276v50.424zm-14.795-7.355c0 6.865-4.476 11.861-13.581 12.844-6.59.707-16.123-.123-20.659-.644-.154-.737-.276-1.654-.276-2.392 0-5.979 3.218-7.355 6.252-7.355 3.158 0 8.125.55 11.804.55 4.075 0 5.301-1.381 5.301-2.696 0-1.719-1.623-2.42-4.781-3.035l-8.645-1.655c-7.173-1.382-11.004-6.346-11.004-11.619 0-6.404 4.536-11.77 13.457-12.75 6.744-.737 14.958.09 19.466.642.152.767.244 1.501.244 2.299 0 5.978-3.157 7.265-6.192 7.265-2.33 0-5.944-.429-10.085-.429-4.201 0-5.946 1.166-5.946 2.574 0 1.502 1.653 2.114 4.292 2.574l8.245 1.534c8.46 1.562 12.108 6.375 12.108 12.293zM209.23 51.404c0-8.58-5.586-12.753-14.482-14.72l-15.585-3.539c-2.833-.63-5.195-1.498-5.195-4.33 0-3.07 2.441-4.25 8.973-4.25 7.715 0 9.525.393 16.53.393 3.229 0 6.532-1.497 6.532-7.871 0-.789-.075-1.655-.233-2.442-4.725-.392-13.146-.865-23.534-.865-15.664 0-21.647 6.77-21.647 15.427 0 8.107 5.118 12.598 14.169 14.721l15.583 3.619c3.622.862 5.591 2.439 5.591 4.723 0 3.07-2.755 4.252-9.287 4.252-7.712 0-11.255-.549-18.262-.549-3.228 0-6.532 1.491-6.532 7.868 0 .787.079 1.651.235 2.44 4.726.469 14.877 1.023 25.265 1.023 15.67-.002 21.89-6.691 21.89-15.9h-.011zM337.841 37.551V24.408h12.355c5.277 0 9.447.784 9.447 6.294 0 4.641-3.147 6.849-9.447 6.849h-12.363.008zm-.081 10.388h6.53l12.612 15.033c2.354 2.912 4.642 4.409 9.994 4.409 3.621 0 6.06-.471 8.022-1.419l-16.382-18.965c9.212-1.967 13.854-7.953 13.854-16.767 0-10.862-6.614-16.214-19.991-16.214l-19.125-.077c-6.216.235-8.268 2.359-8.268 8.027v44.551c.942.156 2.052.231 3.15.231 7.869 0 9.679-2.278 9.679-6.372l-.06-12.438h-.015zM227.72 38.968V24.485h12.828c6.38 0 9.529 2.361 9.529 7.007 0 4.96-3.149 7.477-9.529 7.477l-12.828-.001zm-12.83 27.55c.946.157 2.05.232 3.147.232 7.874 0 9.683-2.277 9.683-6.372V49.594h13.38c14.562 0 21.803-6.295 21.803-18.102 0-11.414-7.241-17.475-20.936-17.475h-18.814c-6.295 0-8.263 2.44-8.263 8.028v44.473zM305.49 39.598c0 6.064-1.022 10.308-3.069 12.83-1.967 2.596-5.197 3.778-9.604 3.778-4.487-.081-7.709-1.338-9.76-3.778-2.042-2.439-3.068-6.689-3.068-12.83 0-6.06 1.103-10.31 3.147-12.751 2.047-2.519 5.273-3.699 9.68-3.699s7.557 1.18 9.604 3.699c2.04 2.441 3.07 6.691 3.07 12.751zm-12.68 27.077c8.263 0 14.642-1.967 19.13-5.981 4.481-3.938 6.77-11.022 6.77-21.095-.084-9.915-2.363-16.844-7.007-20.938-4.647-4.015-10.939-6.059-18.894-6.059-7.948 0-14.247 2.044-18.891 6.059-4.643 4.094-6.928 11.022-7.007 20.938 0 10.073 2.284 17.158 6.771 21.095 4.489 4.015 10.87 5.981 19.13 5.981h-.002zM406.24 24.802h10.312c3.386 0 6.844-1.575 6.844-8.269 0-.784-.076-1.73-.234-2.516h-40.061c-3.385 0-6.851 1.575-6.851 8.263 0 .79.08 1.731.242 2.522h16.919v41.715c.947.156 2.046.231 3.15.231 7.865 0 9.679-2.278 9.679-6.372V24.802zM473.69 51.404c0-8.58-5.595-12.753-14.483-14.72l-15.586-3.539c-2.834-.63-5.195-1.498-5.195-4.33 0-3.07 2.438-4.25 8.971-4.25 7.717 0 9.528.393 16.53.393 3.23 0 6.534-1.497 6.534-7.871 0-.789-.072-1.655-.232-2.442-4.725-.392-13.146-.865-23.538-.865-15.66 0-21.646 6.77-21.646 15.427 0 8.107 5.117 12.598 14.17 14.721l15.584 3.619c3.623.862 5.59 2.439 5.59 4.723 0 3.07-2.757 4.252-9.286 4.252-7.714 0-11.254-.549-18.267-.549-3.227 0-6.531 1.491-6.531 7.868 0 .787.079 1.651.238 2.44 4.72.469 14.875 1.023 25.266 1.023 15.67-.002 21.89-6.691 21.89-15.9h-.009z"
                    fill="#fff"
                  />
                </svg>
                <div className="w-full text-lg font-semibold">NFL</div>
                <div className="w-full text-sm">All news about NFL</div>
              </div>
            </label>
          </li>
        </ul>
        <div className="text-slate-200">List of Articles</div>
        {isLoading && <LoadingPage />}
        {sentiment && (
          <div className="flex flex-col items-center justify-center">
            <div className="text-center text-2xl font-bold">
              Sentiment Analysis
            </div>
            <div className="text-center text-xl font-bold">{sentiment}</div>
          </div>
        )}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles &&
            articles.map((article, index) => {
              return (
                <ArticleCard key={index} index={index} article={article} />
              );
            })}
        </div>
      </main>
    </>
  );
};

export default Home;
