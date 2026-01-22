import { Space, type TableProps } from "antd";

export interface tag   {
  id: string;
  value: string;
 
 }
export const columnsTagTable: TableProps<tag>["columns"] = [
  {
    title: "value",
    dataIndex: "value",
    key: "value",
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
