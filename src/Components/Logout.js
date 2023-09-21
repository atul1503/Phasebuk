import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Logout() {
    const nav=useNavigate();
    useEffect(function(){
        if(localStorage.getItem("username")!==null){
            localStorage.removeItem("username");
        }
        nav("/login");
    })

    return(
        <div>
            You will be logged out!
        </div>
    )
    

}

export default Logout;