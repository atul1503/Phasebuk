import logo from './logo.svg';
import './App.css';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Post } from './Components/Post';
import { isButtonElement } from 'react-router-dom/dist/dom';

async function App() {
  const [posts,setPosts]=useState({postArr:[],lastpostid: null,isFirstRender: true,wantMorePosts: false});
  const params=useParams();
  const nav=useNavigate();
  if(!params.username) {
    nav("/login");
    return;
  } 
  
  async function getHome(){
    var firstrender=null,wantMorePosts=null;
    if(posts.isFirstRender){firstrender=true}
    else if(posts.wantMorePosts) {wantMorePosts=true}
    else return;


    if(posts.lastpostid) {var responseobj=await fetch("http://localhost:8000/home?username="+params.username+"&lastpostid="+posts.lastpostid) }
    else { var responseobj=await fetch("http://localhost:8000/home?username="+params.username) }
    var homeposts=await responseobj.json();
    var newstate=JSON.parse(JSON.stringify(posts));
    if(firstrender) newstate.isFirstRender=false;
    if(wantMorePosts) newstate.wantMorePosts=false;
    newstate.postArr=homeposts;
    newstate.lastpostid=homeposts[homeposts.length-1].postID;
    setPosts(newstate);

  }

  function getMore(e){
    var newstate=JSON.parse(JSON.stringify(posts));
    newstate.wantMorePosts=true;
    setPosts(newstate);
  }


   return (
    <div>
      {
      posts.postArr.map(
        function(postobj) 
        {  
          return(
           <div>
           <Post obj={postobj}/>
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
