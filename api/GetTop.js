import { Util } from "../helpers/GlobalUtil";
export const getTopApi = async (size) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_SERVER}/numberRiddle/getTop/${size}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const { data } = await response.json();
  if (response.status !== 200) throw new Error(data.message);
  return data;
};
