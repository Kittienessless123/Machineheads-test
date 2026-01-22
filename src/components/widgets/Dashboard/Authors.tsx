import React, { useEffect, useState } from "react";
import { columnsUserTable, type user } from "../../../types/user";
import { Table } from "antd";
export const Authors: React.FC = () => {
  const { users, setUser } = useState();
  useEffect(() => {
    try {
      //todo: store который берет данные и фетчит их в дату
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <>
      <Table<user> columns={columnsUserTable} dataSource={users} />;
    </>
  );
};
