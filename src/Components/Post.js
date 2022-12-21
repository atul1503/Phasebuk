import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Post(props) {
 const [loadData,setloadData]=useState(true);
 const [postobj,setpostobj]=useState({});
 const nav=useNavigate();
 const location=useLocation();
 const [prevProps,setprevProps]=useState(props);
 

 useEffect(function(){
    //this effect helps the post comp to load data when it requires.
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
                setpostobj({...obj,isLiked:false});
            }
        });
        if(loadData) setloadData(false);

    })
 });

 useEffect(function(){
    //this effect lets post comp re render with new data when parent renders.
    if(prevProps===props  ||  !props.count) return;
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
    });

    setprevProps(props);
 });




 function likePost(){
        fetch("http://localhost:8000/likeit?username="+localStorage.getItem("username")+"&postID="+postobj.postID)
        .then(()=>{
            setloadData(true);
        })
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
        {postobj.isLiked?" ❤️ ":""}
        <div><span onClick={likePost}> 👍 </span>{postobj.likes>0?postobj.likes:0} <Link to={"/likes?postID="+postobj.postID}>likes</Link> </div>
        {postobj.nocp>0?postobj.nocp:"0"} 
        <Link to={"/post?postID="+postobj.postID}> comments</Link>
    </div>
 );

 

}

export { Post };