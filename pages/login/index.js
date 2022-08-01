
const index = () => {
    const googleHandler=()=>{
        window.open("http://localhost:8080/auth/google", "_self");
    }
  return (
    <div>
        <button onClick={googleHandler}>login with google</button>
    </div>
  )
}

export default index