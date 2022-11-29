import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const [cred,setCred]=useState({username:'',password:'',triedLogin: false});
    const nav=useNavigate();

    function signin(e){
        fetch("http://localhost:8000/login",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: cred.username,password: cred.password})
        })
        .then(data => data.json())
        .then(obj => {
            if(obj.isValid){
                localStorage.setItem("username",cred.username);
                nav("/home");
                setCred({...cred,triedLogin:true});
            }
            else{
                setCred({...cred,triedLogin: true});
            }
        })
    }


    return(
        <div>
            <label for="username"> Username </label>
            <UsernameInput name="username" cred={cred} setCred={setCred}/>
            <label for="password"> Password </label>
            <PasswordInput name="username" cred={cred} setCred={setCred}/>
            <button onClick={signin}>Sign in</button>
            {cred.triedLogin?<div>Incorrect username or password</div>:<div></div>}
        </div>
    )
}

function UsernameInput(props){

    function updatename(e){
        var cred=JSON.parse(JSON.stringify(props.cred));
        cred.username=e.target.value;
        props.setCred(cred);
    }

    return(
        <div>
            <input name={props.name} onChange={e=>updatename(e)}/>
        </div>
    );
}

function PasswordInput(props){

    function updatepassword(e){
        var cred=JSON.parse(JSON.stringify(props.cred));
        cred.password=e.target.value;
        props.setCred(cred);
    }

    return(
        <div>
            <input name={props.name} onChange={e=>updatepassword(e)}/>
        </div>
    );
}

export default Login;