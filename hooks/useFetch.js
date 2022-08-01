import { useEffect, useState } from "react";
import { Util } from "../helpers/GlobalUtil";

export const useFetch = (endpoint,loadInitialState,method) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(loadInitialState);
    let res;

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_NODE_SERVER}${endpoint}`,{
            method,
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${Util.getCookie("token")}`,
            },
        })
            .then(response => {
                res=response;
                return response.json()
            })
            .then((data)=>{
                if(res.status !== 200){
                    throw new Error(data.message)
                }
                setData(data);
            })
            .catch(setError)
            .finally(() => setLoading(false));
    }, [endpoint]);

    return { data, error, loading };
};