import React, {useEffect, useReducer} from 'react';
import { useFetch } from '../../hooks/useFetch';
const GlobalContext = React.createContext({
    globalState : {},
    dispatch : ()=>{},
});
const GlobalReducer=(state,action)=>{

};
const initialState={
    isLoggedIn : false,
    username : null,
}
export const GlobalContextProvider = (props) => {
    const [globalState,dispatch]=useReducer(GlobalReducer,initialState);
    const {data,error,loading}=useFetch("/auth/getStatus",true,"GET");
    if(data) console.log(data);
  
  return (
    <GlobalContext.Provider
      value={{globalState,dispatch}}
    >
      {props.children}
    </GlobalContext.Provider>
  )
};

export default GlobalContext;