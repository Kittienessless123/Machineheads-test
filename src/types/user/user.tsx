import { Space, type TableProps } from "antd";
import type { Role } from "./role";

export interface UserStatus {
  code: number;
  name: string;
}
export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
export interface User {
  id: number;
  phone: string;
  email: string;
  name: string;
  lastName: string;
  secondName: string;
  roles: Role[];
  status: UserStatus;
  isActive: boolean;
  updatedAt: string;
  createdAt: string;
}

export const columnsUserTable: TableProps<User>["columns"] = [
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
    title: "phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "isActive",
    dataIndex: "isActive",
    key: "isActive",
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
