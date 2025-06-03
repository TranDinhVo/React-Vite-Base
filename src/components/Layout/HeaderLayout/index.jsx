import { Link, useLocation } from "react-router-dom";
import "./HeaderLayout.css";
import { Menu } from "antd";
import { Children, useContext, useEffect, useState } from "react";
import {
  AliwangwangOutlined,
  AuditOutlined,
  HomeOutlined,
  LoginOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../context/auth.context";
import LogoutPage from "../../../pages/LogoutPage";

const HeaderLayout = () => {
  const [current, setCurrent] = useState("");
  const { user } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    console.log("Check location: ", location);
    if (location && location.pathname) {
      const allRoutes = ["user", "book"];
      const currenRoute = allRoutes.find(
        (item) => `/${item}` === location.pathname
      );
      if (currenRoute) {
        setCurrent(currenRoute);
      } else {
        setCurrent("home");
      }
    }
  }, [location]);
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  // console.log(">>> check user: ", user);
  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/user">User</Link>,
      key: "user",
      icon: <UsergroupAddOutlined />,
    },

    {
      label: <Link to="/book">Book</Link>,
      key: "book",
      icon: <AuditOutlined />,
    },
    ...(!user.id
      ? [
          {
            label: <Link to="/login">Đăng nhập</Link>,
            key: "login",
            icon: <LoginOutlined />,
          },
        ]
      : []),

    ...(!user.id
      ? []
      : [
          {
            label: `${user.fullName}`,
            key: "fullName",
            icon: <AliwangwangOutlined />,
            children: [{ label: <LogoutPage />, key: "logout" }],
          },
        ]),
  ];
  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </>
  );
};
export default HeaderLayout;
