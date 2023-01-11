import { useLocation, useNavigate } from "react-router-dom";
import { Post } from "./Post";

const { useEffect, useState, useRef } = require("react");

function Comments(){
    const [childpids,setchildpids]=useState([]);
    const [count,setcount]=useState(0); //should be used for updating when required. 
    const nav=useNavigate();
    const inputRef=useRef(null);
    const params=new URLSearchParams(document.location.search);
    const location=useLocation();


    useEffect(function(){
        fetch("http://localhost:8000/childpids?postID="+params.get("postID"))
        .then(data=>data.json())
        .then(arrobj=>{
            setchildpids(arrobj.arr);
        })
    },[location.search,count]);

    function replyPost(e){
        var bdy={
            text: inputRef.current.value,
            parentPostID: Number(params.get("postID")),
            username: localStorage.getItem("username"),
            likes:0,
            nocp:0,
            timestamp: Number(new Date().getTime())
        };
        fetch("http://localhost:8000/newpost",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(bdy)
        })
        .then(data=>data.text())
        .then(data=>{
            if(data==="success"){
                setcount(count+1);
            }
        })
    }

    function goBack(){
        fetch("http://localhost:8000/post?username="+localStorage.getItem("username")+"&postID="+params.get("postID"))
        .then(data=>data.json())
        .then(pobj=>{
            if(pobj.parentPostID && pobj.parentPostID>0){
                nav("/post?postID="+pobj.parentPostID);
                //window.location.reload();
                setcount(count+1);
            }
            else{
                nav("/");
            }
        })
    }

    return(
        <div>
            <button onClick={goBack}>Go back</button>
        <Post pid={params.get("postID")} count={count}/>
        <input type="text" ref={inputRef}/>
        <button onClick={replyPost}>Reply</button>
        {childpids.map(function(pid,idx){
            return(
                <div key={pid} >
                    <Post pid={pid} countcopy={count} childpids={childpids} setchildpids={setchildpids} setcount={setcount}/>
                </div>
            )
        })}
        </div>
    )



}



export default Comments;