import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div>404</div>
      <div>
        <Link to="/">
          <span>Back to homepage</span>{" "}
        </Link>
      </div>
    </>
  );
};
export default Error;
