
import './App.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Post } from './Components/Post';


 function App(props) {
  const [posts,setPosts] = useState({postArr: [],lastpostid: null,isFirstRender: true,wantMorePosts: false});
  const nav=useNavigate();
  useEffect(function(){
    if(!localStorage.getItem("username")){
      nav('/login')
    }
    },[]) 

  useEffect(function() { getHome(); })
  
  async function getHome(){
    var firstrender=null,wantMorePosts=null;
    if(posts.isFirstRender){firstrender=true}
    else if(posts.wantMorePosts) {wantMorePosts=true}
    else return;


    if(posts.lastpostid) {var responseobj=await fetch("http://localhost:8000/home?username="+localStorage.getItem('username')+"&lastpostid="+posts.lastpostid) }
    else { var responseobj=await fetch("http://localhost:8000/home?username="+localStorage.getItem('username')) }
    var homeposts=await responseobj.json();
    var newstate=JSON.parse(JSON.stringify(posts));
    if(firstrender) newstate.isFirstRender=false;
    if(wantMorePosts) newstate.wantMorePosts=false;
    newstate.postArr=homeposts;
    if(homeposts.length>0)
    newstate.lastpostid=homeposts[homeposts.length-1].postID;
    //console.log(newstate);
    setPosts(newstate);

  }

  function getMore(e){
    var newstate=JSON.parse(JSON.stringify(posts));
    newstate.wantMorePosts=true;
    if(posts.postArr.length<1) {return;}
    newstate.lastpostid=posts.postArr[posts.postArr.length-1].postID+1;
    //console.log(newstate);
    setPosts(newstate);
  }

  function incrementLikes(postobj){
    console.log("hi");
    {postobj.likes>0?postobj.likes=postobj.likes+1:postobj.likes=1}
    window.location.reload();
  }


   return (
    <div>
      
      {
      posts.postArr.map(
        function(postobj) 
        {  
          return(
           <div key={postobj.postID} >
           <Post obj={postobj} onClick={e=>{localStorage.setItem("postobj",JSON.stringify(postobj))}} />
           </div>
          )
        }
      )
}
    <button onClick={getMore}> See more </button>
    </div>
  );
  
  

}

export default App;
