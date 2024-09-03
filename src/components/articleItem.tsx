import { FC } from "react";
import { IArticle } from "../models/IArticle";

interface ArticleItemProps {
  article: IArticle;
  remove: (article: IArticle) => void;
  update: (article: IArticle) => void;
}

const ArticleItem: FC<ArticleItemProps> = ({ article, remove, update }) => {
  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(article);
  };

  const handleUpdate = (event: React.MouseEvent) => {
    const title = prompt() || "";
    update({ ...article, title });
  };

  return (
    <div className="article" onClick={handleUpdate}>
      {article.id}. {article.title}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ArticleItem;
