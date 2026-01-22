import React, { useEffect, useState } from "react";
import { columnsArticleTable, type article } from "../../../types/article";
import { Table } from "antd";
export const Articles: React.FC = () => {
  const { articles, setArticle } = useState();
  useEffect(() => {
    try {
      //todo: store который берет данные и фетчит их в дату
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <>
      <Table<article> columns={columnsArticleTable} dataSource={articles} />;
    </>
  );
};
