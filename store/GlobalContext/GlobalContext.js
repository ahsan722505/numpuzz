import React, {useEffect, useReducer,useContext} from 'react';
import { useFetch } from '../../hooks/useFetch';
const GlobalContext = React.createContext({
    globalState : {},
    dispatch : ()=>{},
    authLoading : null
});
const GlobalReducer=(state,action)=>{
  switch (action.type) {
    case "setUsername":
      return { isLoggedIn : true , username : action.payload}
  }
};
const initialState={
    isLoggedIn : false,
    username : null,
}
export const GlobalContextProvider = (props) => {
    const [globalState,dispatch]=useReducer(GlobalReducer,initialState);
    const {data,error,loading:authLoading}=useFetch("/auth/getStatus",true,"GET");
    useEffect(()=>{
      if(data) dispatch({type: "setUsername",payload : data.username});
    },[data]); 
  
  return (
    <GlobalContext.Provider
      value={{globalState,dispatch,authLoading}}
    >
      {props.children}
    </GlobalContext.Provider>
  )
};
export const useGlobalContext = () => useContext(GlobalContext)
export default GlobalContext;