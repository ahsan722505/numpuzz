import { Util } from "../helpers/GlobalUtil";
export const getBestApi=async ()=>{
   const response= await fetch(`${process.env.NEXT_PUBLIC_NODE_SERVER}/numberRiddle/getBest`,{
        method : "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Util.getCookie("token")}`,
        },
    });
    const data= await response.json();
    if(response.status !== 200) throw new Error(data.message);
    return data;
}
