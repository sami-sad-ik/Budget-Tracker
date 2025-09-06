import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";

const Root = () => {
  return (
    <div>
      <Navbar />
      <div className="w-10/12 mx-auto mt-28">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
