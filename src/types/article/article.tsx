import { Space, type TableProps } from "antd";
import type { Avatar } from "../author/author.tsч";
import type { Tag } from "../tags/tag";

export interface ArticlePreview {
  id: number;
  title: string;
  code: string;
  authorName: string;
  previewPicture: Avatar | null;
  tagNames: string[];
  updatedAt: string;
  createdAt: string;
}

export interface ArticleDetail {
  id: number;
  title: string;
  code: string;
  text: string;
  previewPicture: Avatar | null;
  author: {
    id: number;
    fullName: string;
    avatar: Avatar | null;
  };
  tags: Tag[];
  updatedAt: string;
  createdAt: string;
}

export interface CreateArticleRequest {
  code: string;
  title: string;
  authorId: number;
  tagIds: number[];
  text: string;
  previewPicture?: File;
}

export interface UpdateArticleRequest extends CreateArticleRequest {
  id: number;
}

export interface Pagination {
  page: number;
  total: number;
  perPage: number;
}

export const columnsArticleTable: TableProps<ArticlePreview>["columns"] = [
  {
    title: "title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "authorName",
    dataIndex: "authorName",
    key: "authorName",
  },
  {
    title: "previewPicture",
    dataIndex: "previewPicture",
    key: "previewPicture",
  },
  {
    title: "tagNames",
    dataIndex: "tagNames",
    key: "tagNames",
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
