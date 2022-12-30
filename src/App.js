
import './App.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Post } from './Components/Post';


 function App(props) {
  //const [posts,setPosts] = useState({postArr: [],lastpostid: null,loadData: true,wantMorePosts: false});
  const nav=useNavigate();
  const [loadData,setloadData]=useState(true);
  const [postIDArr,setpostIDArr]=useState([]);
  const [wantMorePosts,setwantMorePosts]=useState(false);
  const [wantPrev,setWantPrev]=useState(false);
  

  useEffect(function(){
    if(!localStorage.getItem("username")){
      nav('/login')
    }
    },[]) 

  useEffect(function() { getHome()});
  
  async function getHome(){
    var loaddata,wantmorePosts,wantprev;
    if(loadData){loaddata=true}
    else if(wantMorePosts) {wantmorePosts=true}
    else if(wantPrev) {wantprev=true}
    else return;



    if(wantmorePosts) {var responseobj=await fetch("http://localhost:8000/homepostids?username="+localStorage.getItem('username')+"&lastpostid="+postIDArr[postIDArr.length-1]) }
    else if(wantprev) {var responseobj=await fetch("http://localhost:8000/homepostids?username="+localStorage.getItem('username')+"&firstpostid="+postIDArr[0]) }
    else { var responseobj=await fetch("http://localhost:8000/homepostids?username="+localStorage.getItem('username')) }
    var homepostIDs=await responseobj.json();
    setpostIDArr(homepostIDs);
    if(loaddata) setloadData(false);
    if(wantmorePosts) setwantMorePosts(false);
    if(wantprev) setWantPrev(false);

  }

  function getMore(e){
    setwantMorePosts(true);
  }

  function getPrev(e){
    setWantPrev(true);
  }

   return (
    <div>
      {postIDArr.map(function(id,idx){
        return (
          <div key={id}>
        <Post pid={id}/>
        </div>
        );
      })}

    <button onClick={getMore}> See more </button>
    <button onClick={getPrev}> See prev </button>
    </div>
  );
  
  

}

export default App;
