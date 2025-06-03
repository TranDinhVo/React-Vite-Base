import { Button, Col, Divider, Form, Input, message, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.scss";
import { loginAPI } from "../../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../../components/context/auth.context";
const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);

  const onFinish = async (values) => {
    setLoading(true);
    const res = await loginAPI(values.email, values.password);
    if (res.data) {
      message.success("Đăng nhập thành công!");
      localStorage.setItem("access_token", res.data.access_token);
      setUser(res.data.user);
      navigate("/");
    } else {
      message.error(JSON.stringify(res.message));
    }
    setLoading(false);
  };
  return (
    <>
      <Row className="login__row" gutter={[20, 20]}>
        <Col
          xxl={7}
          xl={10}
          lg={12}
          md={15}
          sm={16}
          xs={24}
          className="login__col"
        >
          <fieldset>
            <legend>Đăng nhập </legend>
            <Form
              className="login-form"
              layout="vertical"
              onFinish={onFinish}
              form={form}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email không được để trống!" },
                  {
                    type: "email",
                    message: "Email không đúng định dạng!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Password không được để trống!" },
                ]}
              >
                <Input.Password
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      form.submit();
                    }
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  loading={loading}
                  onClick={() => {
                    form.submit();
                  }}
                  type="primary"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
            <Divider />
            <div className="login__bottom">
              Chưa có tài khoản?<Link to="/register">Đăng ký tại đây</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
    </>
  );
};
export default LoginPage;
