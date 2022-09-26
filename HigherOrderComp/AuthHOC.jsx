import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAuthStatus } from '../reduxStore/globalSlice'
const AuthHOC = ({children}) => {
  const dispatch=useDispatch();
    useEffect(()=>{
      dispatch(getAuthStatus());
    },[]);
  return (
    <>
      {children}
    </>
    
  )
}

export default AuthHOC