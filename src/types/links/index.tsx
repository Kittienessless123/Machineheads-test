
import { VK } from "../../assets/VK.tsx";
import { GitHubIcon } from "../../assets/GitHubIcon.tsx";
import { Telegram } from "../../assets/Telegram.tsx";

import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>["items"][number];

export const links: MenuItem[] = [
  {
    label: (
      <a
        href="https://vk.com/id143051280"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    ),
    key: "VK",
    icon: <VK />,
  },
  {
    label: (
      <a
        href="https://t.me/Kittienessless"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    ),
    key: "Telegram",
    icon: <Telegram />,
  },
  {
    label: (
      <a
        href="https://github.com/Kittienessless/D_Lingify"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    ),
    key: "GitHub",
    icon: <GitHubIcon />,
  },
];