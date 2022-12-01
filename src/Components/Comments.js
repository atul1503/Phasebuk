import { useNavigate } from "react-router-dom";
import { Post } from "./Post";

const { useEffect, useState } = require("react");

function Comments(){
    //remote localstorage key on back button click
    const [childposts,setChildPosts]=useState([]);
    const [reply,setReply]=useState("");
    const nav=useNavigate();
    var objj=JSON.parse(localStorage.getItem("postobj"));

    useEffect(function(){
        fetch("http://localhost:8000/post?postID="+objj.postID)
        .then(data=>data.json())
        .then(obj=>{
            setChildPosts(obj.childposts);
        });
    });

    return(
        <div>
            <button onClick={e=>{ localStorage.removeItem("postobj"); nav(-1)}}>←---Back to Parent Post</button>
            <Post obj={objj}/>
            <input type="text" name="text" onChange={e=>setReply(e.target.value)}>Enter your reply</input>
            <button onClick={e=>createPost(e,reply,objj)}></button>
            <ul>
                {
                    childposts.map(function(item){
                        return(
                        <li key={item.postID}>
                            <Post obj={item} />
                        </li>
                        );
                    })
                }
            </ul>

        </div>
    )
}


function createPost(e,text,obj){
    var timestamp=new Date;
    timestamp=timestamp.getMilliseconds();
    fetch("http://localhost:8000/newpost",{
      method:'POST',
      headers:{
        'Content-Type':'Application/json'
      },
      body: JSON.stringify({text:reply,nocp:0,timestamp:timestamp,postID:obj.postID})  
    })
}

export default Comments;