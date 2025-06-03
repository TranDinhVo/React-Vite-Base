import HeaderLayout from "./components/Layout/HeaderLayout";
import FooterLayout from "./components/Layout/FooterLayout";
import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { getAccountAPI } from "./services/api.service";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";

const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);

  const delay = (milSeconds) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, milSeconds);
    });
  };
  const fetchUserInfo = async () => {
    const res = await getAccountAPI();
    await delay(1000);
    if (res.data) {
      setUser(res.data.user);
    }
    setIsAppLoading(false);
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);
  return (
    <>
      {isAppLoading === true ? (
        <Spin
          size="large"
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "200px",
          }}
        />
      ) : (
        <>
          <HeaderLayout />
          <Outlet />
          <FooterLayout />
        </>
      )}
    </>
  );
};
export default App;
