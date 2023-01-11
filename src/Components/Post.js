import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState,useRef } from "react";
  


function Post(props) {
 const [loadData,setloadData]=useState(true);
 const [postobj,setpostobj]=useState({});
 const [showoptions,setshowoptions]=useState(false);
 


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
    });

 },[props.count]);




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
        <button onClick={()=>{
            setshowoptions(true);
        }}>...</button>
        

        {showoptions && props.count!==undefined?<PostOptions setshowoptions={setshowoptions} postobj={postobj} count={props.count} />:null}
        {showoptions && props.count===undefined && props.setpostIDArr?<PostOptions setshowoptions={setshowoptions}  setpostIDArr={props.setpostIDArr} postIDArr={props.postIDArr} postobj={postobj} />:null}
        {showoptions && props.count===undefined && !props.setpostIDArr?<PostOptions setshowoptions={setshowoptions} postobj={postobj} setchildpids={props.setchildpids} childpids={props.childpids} setcount={props.setcount} countcopy={props.countcopy} />:null}
        
        {(postobj.hasOwnProperty("mediaURL") && Array.isArray(postobj.mediaURL)) ?
                postobj.mediaURL.map(function(url, idx) {
             return (
                  <img src={url} alt="Abra ka dabra" />
                 );
              }) : postobj.hasOwnProperty("mediaURL")?
           <img src={postobj.mediaURL} alt="Abra ka dabra" /> : ""
        }
        {postobj.isLiked?" ❤️ ":""}
        <div><span onClick={likePost}>   👍   </span>{postobj.likes>0?postobj.likes:0} <Link to={"/likes?postID="+postobj.postID}>likes</Link> </div>
        {postobj.nocp>0?postobj.nocp:"0"} 
        <Link to={"/post?postID="+postobj.postID}> comments</Link>
    </div>
 );

 

}

function PostOptions(props){
    const [alert,setalert]=useState(null);
    const nav=useNavigate();
    

    return (
        <div style={{
            zIndex:1,
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  minHeight: "100vh"
        }}> 
          <button onClick={function(){
            if(props.postobj.username!==localStorage.getItem("username")) {setalert("You can't delete this post");return;};
            fetch("http://localhost:8000/deletePost?postID="+props.postobj.postID,{method: "DELETE"})
            .then(res=>res.text())
            .then(text=>{
                if(text==="success"){
                    setalert("Post deleted successfully");
                    props.setshowoptions(false);
                    if(props.count!==undefined){
                        nav("/home");
                    }
                    if(props.childpids){
                        props.setchildpids(props.childpids.filter(function(e){
                            return e!==props.postobj.postID;
                        }))
                        props.setcount(props.countcopy+1);
                    }
                    else if(props.postIDArr){
                        props.setpostIDArr(props.postIDArr.filter(function(e){
                            return e!==props.postobj.postID;
                        }))
                    }
                }
            })
          }}>Delete post</button>

          <div>{alert?alert:null}</div>
          <button onClick={function(){
            props.setshowoptions(false);
          }}>X</button>
        </div>
    );
}




export { Post };