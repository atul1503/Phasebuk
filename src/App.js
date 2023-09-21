import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Post from "./redux_components/Post";

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
       if(load_next){
        dispatch({
            type: "set_load_next",
            payload: {
                value: false
            }
        })
       }
       if(load_prev){
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
    console.log("Nothing done");
   }

   return (
    <div>
      
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
    </div>
  );
  
  

}

