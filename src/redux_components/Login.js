import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";


export default function Login(){
    const state=useSelector((state)=>state);
    const dispatch=useDispatch();
    const nav=useNavigate();

    function verify(e){
        fetch("http://localhost:8000/login",{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: state.login_page.username,password: state.login_page.password})
        })
        .then(obj=>obj.json())
        .then(obj=>{
            if(obj.isValid){
                dispatch({
                    type: "set_user",
                    payload:{
                        username: obj.username
                    }
            })
            console.log(obj);
            }
        })
    }

    return(
        <div>
            <label for="username">Username</label>
            <input name="username" onChange={
                e=>{
                    dispatch({
                        type: "change_username",
                        payload: e.target.value
                    })
                }
            } />
            <label for="password">Password</label>
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