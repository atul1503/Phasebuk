const { useState } = require("react");
const { useNavigate } = require("react-router-dom");

function Register(){
    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    const nav=useNavigate();

    function register(e){
        fetch("http://localhost:8000/signup",{
            method: "POST",
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username,password
            })
        }).then(response=>response.json())
        .then(obj=>{
            console.log(obj);
            if(obj.success!==true) return;
            nav("/")
        })
    }


    return(
        <div>
        <label>username<input type="text" onChange={(e)=>{
            setusername(e.target.value)
        }}/></label>

        <label>password<input type="text" onChange={(e)=>{
            setpassword(e.target.value)
        }}/></label>
        <button onClick={register}>register</button>
        </div>
    )

}


export default Register;