import { Outlet } from "react-router-dom";

import { Header } from "../../components/index.ts";
import { Footer } from "../../components/index.ts";

export const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <>
        <Outlet />
      </>
      <Footer />
    </>
  );
};
