import React from "react";
import { Menu } from "antd";
import { links } from "../../../types/index.ts";
import { Divider } from "antd";

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  justifyContent: "center",
  minHeight: 50,
  backgroundColor: "transparent",
  alignContent: "center",
};
export const Footer: React.FC = () => {

  return (
    <>
      <Divider />
      <Menu
        style={footerStyle}
        onClick={({ key }) => {
          if (key === "GitHub") {
            window.open("https://github.com/Kittienessless", "_blank");
          }
          if (key === "VK") {
            window.open("https://vk.com/id143051280", "_blank");
          }
          if (key === "Telegram") {
            window.open("https://t.me/Kittienessless", "_blank");
          }
        }}
        mode="horizontal"
        items={links}
      />
    </>
  );
};
