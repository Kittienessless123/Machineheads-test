import { Space, type TableProps } from "antd";

export interface Tag {
  id: number;
  name: string;
  code: string;
  sort: number;
  updatedAt: string;
  createdAt: string;
}

export interface CreateTagRequest {
  code: string;
  name: string;
  sort: number;
}

export interface UpdateTagRequest extends CreateTagRequest {
  id: number;
}

export const columnsTagTable: TableProps<Tag>["columns"] = [
  {
    title: "name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "sort",
    dataIndex: "sort",
    key: "sort",
  },
  {
    title: "updatedAt",
    dataIndex: "updatedAt",
    key: "updatedAt",
  },
  {
    title: "createdAt",
    dataIndex: "createdAt",
    key: "createdAt",
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
