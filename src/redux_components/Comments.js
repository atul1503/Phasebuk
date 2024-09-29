import Post from "./Post";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import {  useEffect } from "react";

export default function Comments(){
    const dispatch=useDispatch();
    const username=useSelector(state=>state.username);
    const reply_text=useSelector(state=>state.Comment_page.reply_text);
    const Replies=useSelector(state=>state.Comment_page.child_posts);
    const post=useSelector(function(state){
        return state.Comment_page.post;
    });

    useEffect(()=>{
        //console.log("getting comment obj")
        fetch("http://localhost:8000/post?postID="+post.postID)
        .then((response)=>{
            return response.json()
        })
        .then((obj)=>{
            //console.log(obj.post);
            dispatch({
                type: "set_comment_post",
                payload: obj.post
            })
        })
    },[Replies.length,post.postID])

    useEffect(function(){

        const id=setInterval(()=>{
        fetch("http://localhost:8000/childpids?postID="+post.postID)
        .then(data=>data.json())
        .then(obj=>{
            var arr=obj.arr;
            dispatch({
                type: "add_reply_post",
                payload: arr
            })
        })},2000)

        return ()=>{
            clearInterval(id);
        }

    },[post.postID])


    function reply(e){
        //console.log("reply text is"+reply_text);
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
    }

    function image_upload(e){
        var file=e.target.files[0];
        var formData=new FormData();
        formData.append('file',file);
        formData.append('username',username);
        formData.append('parentPostID',post.postID)
        fetch("http://localhost:8000/postimage",{
            method: "POST",
            body: formData
        })
        .then(response=>{
            if(response==="success"){
                console.log("message sent successfully.");        
            }
        })
        
    }

    const sortedReplies = [...Replies].sort((a,b)=>{
        if(Number(a.postID)>Number(b.postID)){
            return -1;
        }
        else if(Number(a.postID)<Number(b.postID)){
            return 1;
        }
        return 0;
    })


    return(
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Navbar/>
            <Post parent="Comments"/>
            <input type="text" name="reply" onChange={(e)=>dispatch({
                type: "set_reply",
                payload: e.target.value
            })}/>
            <button onClick={reply}>Reply</button>
            <label style={{ marginLeft: "calc(50%-width/2)" }}>Upload<input type="file"  onChange={(e)=>image_upload(e)}/></label> 
            {sortedReplies.map(function(e,index){
                //console.log("in map"+Replies.length);
                return(
                        <Post key={e.postID} parent="Comments_reply" postID={e.postID}/>
                )
            })}
        </div>
    )
}