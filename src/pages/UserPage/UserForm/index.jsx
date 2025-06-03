import { Button, Input, notification } from "antd";
import "./UserForm.scss";
import { useState } from "react";
import { createUserAPI } from "../../../services/api.service";

const UserForm = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const resetAll = () => {
  //   setFullname("");
  //   setEmail("");
  //   setPassword("");
  //   setPhoneNumber("");
  // };
  const handleClickBtn = async () => {
    const res = await createUserAPI(fullname, email, password, phoneNumber);
    if (res.data) {
      // resetAll();

      notification.success({
        message: "Create user",
        description: "Tạo user thành công",
      });
    } else {
      notification.error({
        message: "Error create user",
        description: JSON.stringify(res.message),
      });
    }
    console.log(">>> check res: ", res.data);
  };
  return (
    <>
      <div className="user-form">
        <div className="user-form__list">
          <div>
            <span>FullName</span>
            <Input
              value={fullname}
              onChange={(event) => setFullname(event.target.value)}
            />
          </div>
          <div>
            <span>Email</span>
            <Input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <span>Password</span>
            <Input.Password
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <span>Phone number</span>
            <Input
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </div>
          <div>
            <Button type="primary" onClick={handleClickBtn}>
              Create User
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserForm;
