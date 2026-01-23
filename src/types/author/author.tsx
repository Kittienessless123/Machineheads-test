import { Space, type TableProps } from "antd";

// types/author.ts
export interface Avatar {
  id: number;
  name: string;
  url: string;
}

export interface Author {
  id: number;
  name: string;
  lastName: string;
  secondName: string;
  avatar: Avatar | null;
  updatedAt: string;
  createdAt: string;
}

export interface AuthorDetail extends Author {
  shortDescription: string;
  description: string;
}

export interface CreateAuthorRequest {
  name: string;
  lastName: string;
  secondName: string;
  shortDescription: string;
  description: string;
  avatar?: File;
  removeAvatar?: boolean;
}

export interface UpdateAuthorRequest extends CreateAuthorRequest {
  id: number;
}

export const columnsAuthorTable: TableProps<Author>["columns"] = [
  {
    title: "name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "lastName",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "secondName",
    dataIndex: "secondName",
    key: "secondName",
  },
  {
    title: "avatar",
    dataIndex: "avatar",
    key: "avatar",
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
        <a>Detailed</a>
        <a>Redact</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
