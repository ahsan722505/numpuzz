export type UserAuthData = {
  username: string;
  userId: string;
  photo: string;
  isLoggedIn: boolean;
  message?: string;
};
export const getAuthStatusApi = async () => {
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
  const data = (await response.json()) as UserAuthData;
  if (response.status !== 200) throw new Error(data.message);
  return data;
};
