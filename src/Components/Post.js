import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Post(props) {
 const [loadData,setloadData]=useState(true);
 const [postobj,setpostobj]=useState({});
 const nav=useNavigate();
 if(props.channelforLoadData && typeof props.channelforLoadData !=='function') props.channelforLoadData(setloadData);

 
 useEffect(function(){
    if(!loadData) return;
    fetch("http://localhost:8000/post?username="+localStorage.getItem("username")+"&postID="+props.pid)
    .then(data=>data.json())
    .then(obj=>{
        //setpostobj(obj);
        //setloadData(false);
        fetch("http://localhost:8000/likes?postID="+props.pid)
        .then(data=>data.json())
        .then(bobj=>{
            if(bobj.likers.includes(localStorage.getItem("username"))){
                setpostobj({...obj,isLiked:true});
            }
            else{
                setpostobj(obj);
            }
        });
        setloadData(false);
    })
 });



 function likePost(){
    return;
 }

 return (
    <div>
        <h3>{postobj.username}</h3>
        <p>{postobj.text}</p>
        {(postobj.hasOwnProperty("mediaURL") && Array.isArray(postobj.mediaURL)) ?
                postobj.mediaURL.map(function(url, idx) {
             return (
                  <img src={url} alt="Abra ka dabra" />
                 );
              }) : postobj.hasOwnProperty("mediaURL")?
           <img src={postobj.mediaURL} alt="Abra ka dabra" /> : ""
        }
        <div>{postobj.likes>0?<span onClick={likePost}>{postobj.likes}</span>:0} likes</div>
        {postobj.nocp>0?postobj.nocp:"0"}
        <Link to={"/post?postID="+postobj.postID}> comments</Link>
    </div>
 );

 

}

export { Post };