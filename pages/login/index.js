
const index = () => {
    const googleHandler=()=>{
        window.open("http://192.168.10.16:8080/auth/google", "_self");
    }
  return (
    <div>
        <button onClick={googleHandler}>login with google</button>
    </div>
  )
}

export default index