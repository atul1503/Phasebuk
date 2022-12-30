import Navigator from "./Navigator";
import { Outlet,useNavigate } from "react-router-dom";
import { useEffect, useRef,useState } from "react";
import { createPost } from "../Util";

function Layout() {
    var textref=useRef();
    const [showmsg,setshowmsg]=useState(false);
    var nav=useNavigate();
    if(!localStorage.getItem("username")){
        nav("/login");
    }

    useEffect(()=>{
        if(!showmsg) return;
        setTimeout(()=>{
            setshowmsg(false);
        },5000)
    },[showmsg])

        return(
        <div>
        <Navigator/>
        <input type="text"  ref={textref} />
        <button onClick={
           async ()=>{
                var obj={
                    text:textref.current.value,
                    parentPostID:-1,
                    username: localStorage.getItem("username"),
            likes:0,
            nocp:0,
            timestamp: Number(new Date().getTime())
                }

               var data=await createPost(obj,nav)
           if(data==="success"){
            setshowmsg(true);
           } 
         }



            }
        >Share with friends</button>
        {showmsg?<div>Your post was posted. Your friends will see your post if they come online.</div>:null}
        <Outlet/>
        
        
        </div>
        )

}

export default Layout;