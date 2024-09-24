import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function Post(props){
    const dispatch=useDispatch();
    const nav=useNavigate();
    const [params,setparams]=useSearchParams();
    const username=useSelector(state=>state.username);
    const post=useSelector((state)=>{
        if(props.parent==="Home"){
            for(let i=0;i<state.Home.homeposts.length;i++){
                if(state.Home.homeposts[i].postID===props.postID){
                    return(state.Home.homeposts[i]);
                }
            }
        }
        else if(props.parent==="Comments"){
            return (state.Comment_page.post)
        }
        else if(props.parent==="Comments_reply"){
            for(let i=0;i<state.Comment_page.child_posts.length;i++){
                if(state.Comment_page.child_posts[i].postID===props.postID){
                    return(state.Comment_page.child_posts[i])
                }
            }
        }
    });

    function goToComments(e){
        dispatch({
            type:"set_comment_post",
            payload: post
        })
        dispatch({
            type: "clear_child_posts"
        })
        nav("/comments?postID="+post.postID);
    }

    function liker(e){
        if(post.isLiked){
            fetch("http://localhost:8000/likeit?username="+username+"&postID="+post.postID)
            .then(ob=>ob.json())
            .then(ob=>{
                dispatch({
                    type: "set_like",
                    payload: {
                        postID: post.postID,
                        value: false
                }});
            });
        }
        else{
            fetch("http://localhost:8000/likeit?username="+username+"&postID="+post.postID)
            .then(ob=>ob.json())
            .then(ob=>{
                dispatch({
                    type: "set_like",
                    payload: {
                        postID: post.postID,
                        value: true
                }});
            });
        }
    }


    if(post!==undefined){
    return(
        <div>
            <b><p>{post.username}</p></b>
            <p>{post.text}</p>
            {post.isLiked?<span onClick={liker}>💖{post.likes}</span>:<span onClick={liker}>{post.likes}👍</span>} <span onClick={goToComments}>{post.nocp} comments</span>

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
