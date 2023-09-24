import { useDispatch, useSelector } from "react-redux";


export default function Post(props){
    const dispatch=useDispatch();
    const username=useSelector(state=>state.username);
    const post=useSelector((state)=>{
        if(props.parent==="Home"){
            for(let i=0;i<state.Home.homeposts.length;i++){
                if(state.Home.homeposts[i].postID===props.postID){
                    return(state.Home.homeposts[i]);
                }
            }

        }
    });

    function liker(e){
        if(post.isLiked){
            dispatch({
                type: "set_like",
                payload: {
                    postID: post.postID,
                    value: false
            }});
            fetch("http://localhost:8000/likeit?username="+username+"&postID="+post.postID)
            .then(ob=>ob.json())
            .then(ob=>{
                console.log(ob);
            });
        }
        else{
            dispatch({
                type: "set_like",
                payload: {
                    postID: post.postID,
                    value: true
            }});
            fetch("http://localhost:8000/likeit?username="+username+"&postID="+post.postID)
            .then(ob=>ob.json())
            .then(ob=>{
                console.log(ob);
            });
        }
    }


    if(post!==undefined){
    return(
        <div>
            <b><p>{post.username}</p></b>
            <p>{post.text}</p>
            {post.isLiked?<span onClick={liker}>💖{post.likes}</span>:<span onClick={liker}>{post.likes}👍</span>} <span>{post.nocp} comments</span>

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
