import React, { useEffect, useState } from "react";
import { columnsTagTable, type tag } from "../../../types/tags";
import { Table } from "antd";
export const Tags: React.FC = () => {
  const { tags, setTags } = useState();
  useEffect(() => {
    try {
      //todo: store который берет данные и фетчит их в дату
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <>
      <Table<tag> columns={columnsTagTable} dataSource={tags} />;
    </>
  );
};
