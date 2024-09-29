import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Post from "./redux_components/Post";
import Navbar from "./redux_components/Navbar";

export default function App(){

    const username=useSelector(state=>state.username);
    const posts=useSelector(state=>state.Home.homeposts);
    const load_prev=useSelector(state=>state.Home.load_prev);
    const load_next=useSelector(state=>state.Home.load_next);
    const nav=useNavigate();
    const dispatch=useDispatch();


    useEffect(function() {
        if(username===""){
            nav("/login");
        }
    })

    useEffect(function(){
        if(load_next || load_prev || posts.length===0){
        if( load_next===false && load_prev===false ){
        fetch("http://localhost:8000/homepostids?username="+username)
        .then(obj=>obj.json())
        .then(arr=>{
            dispatch({
                type: "add_posts_to_home",
                payload:{
                    posts: arr
                }
            });
        
        })
    }
       if(load_next){

        fetch("http://localhost:8000/homepostids?username="+username+"&lastpostid="+posts[posts.length-1].postID)
        .then(obj=>obj.json())
        .then(arr=>{
            dispatch({
                type: "add_posts_to_home",
                payload:{
                    posts: arr
                }
            });
        })

        dispatch({
            type: "set_load_next",
            payload: {
                value: false
            }
        })
       }
       if(load_prev){
        fetch("http://localhost:8000/homepostids?username="+username+"&firstpostid="+posts[0].postID)
        .then(obj=>obj.json())
        .then(arr=>{
            dispatch({
                type: "add_posts_to_home",
                payload:{
                    posts: arr
                }
            });
        });

        dispatch({
            type: "set_load_prev",
            payload: {
                value: false
            }
        })
       }
    }
})

   function getMore(){
    dispatch({
        type: "set_load_next",
        payload: {
            value: true
        }
    })
   }

   function getPrevious(){
    dispatch({
        type: "set_load_prev",
        payload: {
            value: true
        }
    })
   }

   return (
    <div>
        <Navbar/>
      
      {
      posts.map(
        function(postobj) 
        {  
          return(
           <div key={postobj.postID} >
           <Post parent="Home" postID={postobj.postID}/>
           </div>
          )
        }
      )
}
    <button onClick={getMore}> See more </button>
    <button onClick={getPrevious}> See previous </button>
    </div>
  );
  
  

}

