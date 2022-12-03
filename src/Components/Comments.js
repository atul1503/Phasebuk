import { useNavigate, useSearchParams } from "react-router-dom";
import { Post } from "./Post";

const { useEffect, useState } = require("react");

function Comments(){
    //remote localstorage key on back button click
    const [childposts,setChildPosts]=useState([]);
    const [reply,setReply]=useState("");
    const nav=useNavigate();
    const [params,setparams]=useSearchParams();
    var postobj=JSON.parse(localStorage.getItem("postobj")).pop();

    useEffect(function(){
        fetch("http://localhost:8000/post?postID="+postobj.postID)
        .then(data=>data.json())
        .then(obj=>{
            setChildPosts(obj.childposts);
        });
    },[postobj.postID]);

    return(
        <div>
            <button onClick={e=>{
                var arr=JSON.parse(localStorage.getItem("postobj"));
                arr.pop();
                localStorage.setItem("postobj",JSON.stringify(arr));
                nav(-1);

            }}>←---Back to Parent Post</button>
            <Post obj={postobj}/>
            <input type="text" name="text" onChange={e=>setReply(e.target.value)}/>
            <button onClick={e=>{createPost(e,reply,postobj)}}>Reply</button>
            {childposts.length===0?<h5>No one replied to {postobj.username}'s post</h5>:""}
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
    var timestamp=new Date();
    timestamp=timestamp.getMilliseconds();
    fetch("http://localhost:8000/newpost",{
      method:'POST',
      headers:{
        'Content-Type':'Application/json'
      },
      body: JSON.stringify({
        text:text,
        nocp:0,
        likes:0,
        timestamp:timestamp,
        username:localStorage.getItem("username"),
        parentPostID:obj.postID.toString()
    })  
    }
    //backend has to provide correct postid to this obj and store the entire obj in db
    )
    .then(str=>{if(str==="success") console.log(str);})
}

export default Comments;