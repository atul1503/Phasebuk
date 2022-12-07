import { useNavigate, useSearchParams } from "react-router-dom";
import { Post } from "./Post";

const { useEffect, useState } = require("react");

function Comments(){
    //remote localstorage key on back button click
    const [childposts,setChildPosts]=useState([]);
    const [reply,setReply]=useState("");
    const [isLiked,setisLiked]=useState("");
    const nav=useNavigate();
    const [params,setparams]=useSearchParams();
    const [postobj,setpostobj]=useState(JSON.parse(localStorage.getItem("postobj")));

    useEffect(function(){
        fetch("http://localhost:8000/post?postID="+postobj.postID)
        .then(data=>data.json())
        .then(obj=>{
            setChildPosts(obj.childposts);
        });
    },[postobj.postID]);


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
        .then(str=>str.text())
        .then(msg=>{if(msg==="success") {
            var objArr=JSON.parse(localStorage.getItem("postobj"));
            var obj=objArr.pop();
            obj.nocp>0?obj.nocp=obj.nocp+1:obj.nocp=1;
            objArr.push(obj);
            localStorage.setItem("postobj",JSON.stringify(objArr));
            window.location.reload()
        }});
    }

    function goToPrev(e){
        if(parseInt(postobj.parentPostID)>0){
            fetch("http://localhost:8000/post?postID="+postobj.parentPostID)
        .then(data=>data.json())
        .then(obj=>{
            localStorage.setItem("postobj",JSON.stringify(obj));
            setpostobj(obj.parentpost);
            nav("/post?username="+localStorage.getItem("username")+"&postid="+postobj.parentPostID);
        });    
        }
        else{
            nav("/");
        }
        
    }

    return(
        <div>
            <button onClick={e=>{goToPrev(e)}}>←---Back to Parent Post</button>
            <Post obj={postobj}/>
            <input type="text" name="text" onChange={e=>setReply(e.target.value)}/>
            <button onClick={e=>{createPost(e,reply,postobj)}}>Reply</button>
            {childposts.length===0?<h5>No one replied to {postobj.username}'s post</h5>:""}
            <ul>
                {
                    childposts.map(function(item){
                        return(
                        <li key={item.postID}>
                            <Post obj={item} changePID={setpostobj}/>
                        </li>
                        );
                    })
                }
            </ul>

        </div>
    )
}




export default Comments;