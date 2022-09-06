import { Util } from "../helpers/GlobalUtil";
export const getAuthStatusApi = async () => {
  console.log("auth");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_SERVER}/auth/getStatus`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  if (response.status !== 200) throw new Error(data.message);
  console.log("no");
  return data;
};
