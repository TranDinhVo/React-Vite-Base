import { message } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../components/context/auth.context";
import { useNavigate } from "react-router-dom";
import { logoutAPI } from "../../services/api.service";

const LogoutPage = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await logoutAPI();
    if (res.data) {
      localStorage.removeItem("access_token");
      setUser({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      });
      message.success("Đăng xuất thành công!");
      navigate("/");
    }
  };
  return (
    <>
      <span onClick={handleLogout}>Đăng xuất</span>
    </>
  );
};
export default LogoutPage;
