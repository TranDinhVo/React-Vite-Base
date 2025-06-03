import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import "./RegisterPage.scss";
import { registerUserAPI } from "../../services/api.service";
import { Link, useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    // call api
    const res = await registerUserAPI(
      values.fullName,
      values.email,
      values.password,
      values.phone
    );
    console.log(res);
    if (res.data) {
      notification.success({
        message: "Register user",
        description: "Đăng kí user thành công",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Register user error",
        description: JSON.stringify(res.message),
      });
    }
  };
  return (
    <>
      <Row className="register__row" gutter={[20, 20]}>
        <Col
          xxl={7}
          xl={10}
          lg={12}
          md={15}
          sm={16}
          xs={24}
          className="register__col"
        >
          <fieldset>
            <legend>Đăng kí</legend>
            <Form
              className="register-form"
              layout="vertical"
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              form={form}
            >
              <Form.Item
                label="Fullname"
                name="fullName"
                rules={[
                  { required: true, message: "Fullname không được để trống!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email không được để trống!" },
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
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(/\d+/g),
                    message: "Wrong phone!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button
                  onClick={() => {
                    form.submit();
                  }}
                  type="primary"
                >
                  Đăng kí
                </Button>
              </Form.Item>
            </Form>
            <Divider />
            <div className="register__bottom">
              Đã có tài khoản?<Link to="/login">Đăng nhập tại đây</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
    </>
  );
};
export default RegisterPage;
