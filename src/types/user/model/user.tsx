import { Space, type TableProps } from "antd";

export interface user {
  id: string;
  email: string;
  name: string;
  secondname: string;
  password: string;
  role: number;
}

export const columnsUserTable: TableProps<user>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "secondname",
    dataIndex: "secondname",
    key: "secondname",
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
