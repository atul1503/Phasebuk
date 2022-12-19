import { useNavigate } from "react-router-dom";
import { Post } from "./Post";

const { useEffect, useState } = require("react");

function Comments(){
    const [childpids,setchildpids]=useState([]);
    const [childloadDataHandler,setchildloadDataHandler]=useState(null);
    //you can call childloadDataHandler(true) or false to set loadData of post comp to true or false.
    const params=new URLSearchParams(document.location.search);


    function replyPost(){
        //
    }


    return(
        <div>
        <Post pid={params.get("postID")} channelforLoadData={setchildloadDataHandler}/>
        <input type="text"/>
        <button onClick={replyPost}>Reply</button>
        {childpids.map(function(pid,idx){
            return(
                <div>
                    <Post pid={pid}/>
                </div>
            )
        })}
        </div>
    )



}




export default Comments;