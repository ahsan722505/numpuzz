import { Alert, Button } from "antd";
import Login from "../Auth/Login";

const LoggedOutBanner = () => {
  return (
    <Alert
      className="!border-0 !rounded-none !text-base md:!pl-[52px] md:!pr-[52px] !bg-purple"
      message={
        <span className="text-background text-lg font-bold">
          Login to get featured on the leaderboards!
        </span>
      }
      action={<Login />}
    />
  );
};

export default LoggedOutBanner;
