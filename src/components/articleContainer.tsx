import { useState, useEffect } from "react";
import { IArticle } from "../models/IArticle";
import { articleAPI } from "../services/articleService";
import ArticleItem from "./articleItem";

const ArticleContainer = () => {
  const [limit, setLimit] = useState(0);
  const {
    data: articles,
    isLoading,
    error,
  } = articleAPI.useFetchAllArticlesQuery(limit);
  const [createArticle, {}] = articleAPI.useCreateArticleMutation();
  const [removeArticle, {}] = articleAPI.useDeleteArticleMutation();
  const [updateArticle, {}] = articleAPI.useUpdateArticleMutation();

  useEffect(() => {
    setTimeout(() => {
      setLimit(20);
    }, 2000);
  }, []);

  const handleCreate = async () => {
    const title = prompt();
    await createArticle({ title, body: title } as IArticle);
  };

  const handleUpdate = (article: IArticle) => {
    updateArticle(article);
  };

  const handleDelete = (article: IArticle) => {
    removeArticle(article);
  };

  return (
    <div>
      <div className="article__list">
        <button onClick={handleCreate}>Добавить пост</button>
        {isLoading && <h2>Загрузка...</h2>}
        {error && <h2>Произошла ошибка при загрузке</h2>}
        {articles &&
          articles.map((article) => (
            <ArticleItem
              update={handleUpdate}
              remove={handleDelete}
              key={article.id}
              article={article}
            />
          ))}
      </div>
    </div>
  );
};

export default ArticleContainer;
