import { useSelector } from "react-redux";


export default function Post(props){
    const post=useSelector((state)=>{
        if(props.parent==="Home"){
            for(let i=0;i<state.Home.homeposts.length;i++){
                if(state.Home.homeposts[i].postID===props.postID){
                    return(state.Home.homeposts[i]);
                }
            }

        }
    });
    if(post!==undefined){
    return(
        <div>
            <b><p>{post.username}</p></b>
            <p>{post.text}</p>
        </div>
    )
}
else{
    return(
        <div>
            Not loaded
        </div>
    )
}
}
