import { Space, type TableProps } from "antd";

export interface article   {
  id: string;
  title: string;
  text: string;
 
 }
export const columnsArticleTable: TableProps<article>["columns"] = [
  {
    title: "title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "text",
    dataIndex: "text",
    key: "text",
  },

  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>Redact</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
