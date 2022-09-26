import { Util } from "../helpers/GlobalUtil";
export const setBestApi = async (payload) => {
  console.log("ending:", payload);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_SERVER}/numberRiddle/setBest`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const data = await response.json();
  if (response.status !== 201) throw new Error(data.message);
  return data;
};
