import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Post(props) {
    const [obj,setobj]=useState(props.obj);

    function likePost(){
        var postobj=obj;
        if(postobj.isLiked){
            return;
        }
        fetch("http://localhost:8000/likeit?username="+localStorage.getItem("username")+"&postID="+postobj.postID)
        .then(res=>res.json())
        .then(obj=>{
            if(Object.keys(obj).length>0){
                obj.isLiked=true;
                setobj(obj);
            }
        })
    }

    useEffect(function(){
        if(obj.postID!==props.obj.postID){
            setobj({...props.obj})
        }
    });



    //other logic
    if(Array.isArray(obj.imageUrl)) {
    return (
<div onClick={likePost}>
    <p>{obj.text}</p>
    <div>
    {obj.imageUrl.map(function(url) {
        return(
        <img src={url} alt="Abdra ka dabdra"/>
        );
    })}
    <Footer obj={obj} changePID={props.changePID}/>
    </div>
</div>
    );
    }
    else {
        return (
            <div onClick={likePost}>
                <h4>{obj.username}</h4>
                <p>{obj.text}</p>
                {obj.imageUrl?<img src={obj.imageUrl} alt="Abra ka dabra" />:""}
                <Footer obj={obj} changePID={props.changePID} />
            </div>
        );
    }
}

function Footer(props){


    return(
        <div>
            {props.obj.isLiked?"You 👍 this":""}
            <div>{props.obj.likes>0?props.obj.likes:0} 
            {props.obj.likes>0?<Link to={"/likes?username="+props.obj.username+"&postid="+props.obj.postID} > likes</Link>:" likes"}
            </div>
            <div>
                {props.obj.nocp>0?props.obj.nocp:0}
                <Link to={"/post?username="+localStorage.getItem("username")+"&postid="+props.obj.postID} onClick={e=>{
                    pushPostToStack(e,props.obj);
                    if(props.changePID!==undefined){
                        props.changePID({...props.obj});
                    }
                    }}> comments</Link>
            </div>
        </div>
    );

}

function pushPostToStack(e,obj){
    localStorage.setItem("postobj",JSON.stringify(obj));
}

export { Post };