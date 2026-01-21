import {
  createRoutesFromElements,
  createHashRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

import {Layout}  from "../Layout/Layout.tsx";
import {LoginPage}  from "../../pages/index.ts";
import {AdminPage}  from "../../pages/index.ts";

export const AppRouter = () => {


  const routers = createRoutesFromElements(
    <Route path="/"  element={<Layout />}>
     <Route index element={<LoginPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Admin" element={<AdminPage />} />
    {/* 
      <Route path="*" element={<Fallback />} />
            <Route path="*" element={<Fallback />} /> 
 */}
    </Route>
  );

  const router = createHashRouter(routers, {});

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};