import { useNavigate } from "react-router-dom";


async function createPost(postobj,nav){
    if(!localStorage.getItem("username")){
        nav("/login");
    }
    var data=await fetch("http://localhost:8000/newpost",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(postobj)
    });
    var text=await data.text();
    if(text==="success"){
        return text;
    }
    else{
        return "failed";
    }
    
}

export {createPost};