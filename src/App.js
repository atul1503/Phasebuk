
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
  

  useEffect(function(){
    if(!localStorage.getItem("username")){
      nav('/login')
    }
    },[]) 

  useEffect(function() { getHome()});
  
  async function getHome(){
    var loaddata,wantmorePosts;
    if(loadData){loaddata=true}
    else if(wantMorePosts) {wantmorePosts=true}
    else return;



    if(wantmorePosts) {var responseobj=await fetch("http://localhost:8000/homepostids?username="+localStorage.getItem('username')+"&lastpostid="+postIDArr[postIDArr.length-1]) }
    else { var responseobj=await fetch("http://localhost:8000/homepostids?username="+localStorage.getItem('username')) }
    var homepostIDs=await responseobj.json();
    setpostIDArr(homepostIDs);
    if(loaddata) setloadData(false);
    if(wantmorePosts) setwantMorePosts(false);

  }

  function getMore(e){
    setwantMorePosts(true);
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
    </div>
  );
  
  

}

export default App;
