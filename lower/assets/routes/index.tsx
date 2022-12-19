import React, { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Auth } from "layouts/Auth";
import Layout from "layouts/VerticalLayout";
import Debtor from "./Debtor";

// components
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import Forgot from "pages/auth/Forgot";
import NewPassword from "pages/auth/NewPassword";
import Root from "pages/Root";
import Profile from "pages/Profile";

interface RouteProps {
  path: string;
  Element: any;
  Layout?: any;
  Child?: any;
}

const loggedRoutes = [
  { path: "/", Element: Root, Layout },
  { path: "/profile", Element: Profile, Layout },
  { path: "/debtors/*", Element: Debtor, Layout },
];

const nonLoggedRoutes = [
  { path: "/login", Element: Login, Layout: Auth },
  { path: "/register", Element: Register, Layout: Auth },
  { path: "/forgot-password", Element: Forgot, Layout: Auth },
  { path: "/new-password", Element: NewPassword, Layout: Auth },
];

const Router: FC = () => {
  // const userStatus = useSelector((state) => state.user.status);
  // const navigate = useNavigate();
  // const location = useLocation();

  useEffect(
    () => {
      // if (userStatus === "logged") {
      //   if (
      //     ["login", "register", "forgot-password", "new-password"].includes(
      //       location.pathname.substring(1)
      //     )
      //   ) {
      //     navigate("/");
      //   }
      // }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [
      /*userStatus*/
    ]
  );

  // const actual = userStatus === 'logged' ? loggedRoutes : nonLoggedRoutes
  const actual: RouteProps[] = [...nonLoggedRoutes, ...loggedRoutes];

  return (
    <Routes>
      {actual.map(({ Element, Layout, Child, ...rest }, idx) => {
        return (
          <Route
            key={idx}
            {...rest}
            element={
              <Layout preloader={false}>
                <Element />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
};

export default Router;
