import { CircularProgress } from "@mui/material";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeaderBoard from "../../components/number-riddle/Leaderboard";
import { getTop } from "../../reduxStore/NumberRiddleSlice";
const leaderboard=()=>{
    const {global :{loading:authLoading},numberRiddle : {loading,leaderBoardSize,leaderBoardData}}=useSelector(state=> state);
    const dispatch=useDispatch();
    useEffect(()=>{
        if(!leaderBoardData[leaderBoardSize]) dispatch(getTop(leaderBoardSize));
    },[leaderBoardSize])
    return (
        <>
            <Head>
                <title>Number Riddle | leaderboard</title>
                <meta name="description" content="Numpuz: Number Riddle is a classic math puzzle game online available for free. Tap and move the wood number tiles, enjoy the magic of digit, coordinate your eyes, hands and brain." />
            </Head>
            <style global jsx>{`
                body {
                background: #0A1929;
                }
            `}</style>
            { loading || authLoading && <CircularProgress/>}
                {!loading && !authLoading && <LeaderBoard/>}
    </>
    )
}
export default leaderboard;