import logo from './logo.svg';
import './App.css';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Post } from './Components/Post';

async function App() {
  const [posts,setPosts]=useState({posts: null,lastpostid: null,isFirstRender: true,wantMorePosts: false});
  const params=useParams();
  if(!params.username) {
    useNavigate()("/login");
    return;
  } 
  
  async function getHome(){
    var firstrender=null,wantMorePosts=null;
    if(posts.isFirstRender){firstrender=true}
    else if(posts.wantMorePosts) {wantMorePosts=true}
    else return;


    if(lastpostid) {var responseobj=await fetch("http://localhost:8000/home?username="+params.username+"&lastpostid="+posts.lastpostid) }
    else { var responseobj=await fetch("http://localhost:8000/home?username="+params.username) }
    var homeposts=await responseobj.json();
    var newstate=JSON.parse(JSON.stringify(posts));
    if(firstrender) newstate.isFirstRender=false;
    if(wantMorePosts) newstate.wantMorePosts=false;
    newstate.posts=homeposts;
    setPosts(newstate);

  }

  return(
    {posts.map(function(postobj) {
      <Post obj={postobj}/>
    })}
  );

}

export default App;
