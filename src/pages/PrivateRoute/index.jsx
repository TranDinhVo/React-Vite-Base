import { useContext } from "react";
import { AuthContext } from "../../components/context/auth.context";
import { Link, Navigate } from "react-router-dom";
import { Button, Result } from "antd";
const PrivateRoute = (props) => {
  const { user } = useContext(AuthContext);

  if (user && user.id) {
    return <>{props.children}</>;
  }
  return (
    <Result
      status="403"
      title="Unauthorize!"
      // error.statusText || error.message
      subTitle="Bạn cần đăng nhập để truy cập nguồn tài nguyên này!"
      extra={
        <Button type="primary">
          <Link to="/login">
            <span>Back to Login</span>
          </Link>
        </Button>
      }
    />
  );
};
export default PrivateRoute;
