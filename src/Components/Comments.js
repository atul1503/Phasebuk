import { useNavigate } from "react-router-dom";
import { Post } from "./Post";

const { useEffect, useState } = require("react");

function Comments(){
    //remote localstorage key on back button click
    const [childposts,setChildPosts]=useState([]);
    const nav=useNavigate();

    useEffect(function(){
        fetch("http://localhost:8000/post?postID="+localStorage.getItem("postObj").postID)
        .then(data=>data.json())
        .then(obj=>{
            setChildPosts(obj.childposts);
        });
    });

    return(
        <div>
            <button onClick={e=>{ localStorage.removeItem("postobj"); nav(-1)}}>←---Back to Parent Post</button>
            <Post obj={localStorage.getItem("postObj")}/>
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

export default Comments;