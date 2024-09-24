import { useSearchParams } from "react-router-dom";
import Post from "./Post";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Comments(){
    const [params,setParams]=useSearchParams();
    const dispatch=useDispatch();
    const username=useSelector(state=>state.username);
    const reply_text=useSelector(state=>state.Comment_page.reply_text);
    const Replies=useSelector(state=>state.Comment_page.child_posts);
    const post=useSelector(function(state){
        return state.Comment_page.post;
    });

    useEffect(function(){
        fetch("http://localhost:8000/childpids?postID="+post.postID)
        .then(data=>data.json())
        .then(obj=>{
            var arr=obj.arr;
            console.log(arr);
            dispatch({
                type: "add_reply_post",
                payload: arr
            })
        })
    },[])


    function reply(e){
        var newpost={
            username: username,
            text: reply_text,
            parentPostID: post.postID,
            likes:0,
            nocp:0,
            timestamp: Number(new Date().getTime())
        }
        fetch("http://localhost:8000/newpost",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(newpost)
    })
    .then(data=>data.json())
    .then(obj=>{
        dispatch({
            type: "add_reply_post",
            payload: obj
        })
    })
    }


    return(
        <div>
            <Navbar/>
            <Post parent="Comments"/>
            <label for="reply"/>
            <input type="text" name="reply" onChange={function(e){
                dispatch({
                    type: "set_reply",
                    payload: e.target.value
                })
            }}/>
            <button onClick={reply}>Reply</button>
            {Replies.map(function(e,index){
                //console.log(e.postID);
                return(
                        <Post key={e.postID} parent="Comments_reply" postID={e.postID}/>
                )
            })}
        </div>
    )
}