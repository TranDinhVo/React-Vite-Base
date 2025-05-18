import HeaderLayout from "./components/Layout/HeaderLayout";
import FooterLayout from "./components/Layout/FooterLayout";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <HeaderLayout />

      <Outlet />
      <FooterLayout />
    </>
  );
};
export default App;
