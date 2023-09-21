import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Login(){
    const username=useSelector(state=>state.login_page.username);
    const password=useSelector(state=>state.login_page.password);
    const dispatch=useDispatch();
    const nav=useNavigate();

    function verify(e){
        fetch("http://localhost:8000/login",{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(obj=>obj.json())
        .then(obj=>{
            if(obj.isValid){
                dispatch({
                    type: "set_user",
                    payload:{
                        username: obj.username
                    }
            });
            nav("/");
            
            
            }
        })
    }

    return(
        <div>
            <label htmlFor="username">Username</label>
            <input name="username" onChange={
                e=>{
                    dispatch({
                        type: "change_username",
                        payload: e.target.value
                    })
                }
            } />
            <label htmlFor="password">Password</label>
            <input name="password" onChange={e=>{
                dispatch({
                    type: "change_password",
                    payload: e.target.value
                })
            }}/>
            <button onClick={verify}>Log in</button>
        </div>
    )
}