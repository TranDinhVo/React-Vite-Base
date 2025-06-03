import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <Result
        status="404"
        title="Opps"
        // error.statusText || error.message
        subTitle="hhe"
        extra={
          <Button type="primary">
            <Link to="/">
              <span>Back to homepage</span>
            </Link>
          </Button>
        }
      />
    </>
  );
};
export default Error;
