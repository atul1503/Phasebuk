
import './App.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Post } from './Components/Post';


 function App(props) {
  const [posts,setPosts] = useState({postArr: [],lastpostid: null,isFirstRender: true,wantMorePosts: false});
  const location=useLocation();
  const params=new URLSearchParams(location.search);
  const nav=useNavigate();
  
  useEffect(function(){
    if(!params.get('username')) {
      nav("/login");
      return;
    }
  },[]) 

  useEffect(function() { getHome(); })
  
  async function getHome(){
    var firstrender=null,wantMorePosts=null;
    if(posts.isFirstRender){firstrender=true}
    else if(posts.wantMorePosts) {wantMorePosts=true}
    else return;


    if(posts.lastpostid) {var responseobj=await fetch("http://localhost:8000/home?username="+params.get('username')+"&lastpostid="+posts.lastpostid) }
    else { var responseobj=await fetch("http://localhost:8000/home?username="+params.get('username')) }
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
    newstate.lastpostid=posts.postArr[posts.postArr.length-1].postID+1;
    console.log(newstate);
    setPosts(newstate);
  }

   return (
    <div>
      
      {
      posts.postArr.map(
        function(postobj) 
        {  
          return(
           <div key={postobj.timestamp} >
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
