import { Link } from "react-router-dom";

function Post(props) {



    //other logic
    if(Array.isArray(props.obj.imageUrl)) {
    return (
<div>
    <p>{props.obj.text}</p>
    <div>
    {props.obj.imageUrl.map(function(url) {
        return(
        <img src={url} alt="Abdra ka dabdra"/>
        );
    })}
    <Footer obj={props.obj} changePID={props.changePID}/>
    </div>
</div>
    );
    }
    else {
        return (
            <div>
                <h4>{props.obj.username}</h4>
                <p>{props.obj.text}</p>
                {props.obj.imageUrl?<img src={props.obj.imageUrl} alt="Abra ka dabra" />:""}
                <Footer obj={props.obj} changePID={props.changePID}/>
            </div>
        );
    }
}

function Footer(props){
    return(
        <div>
            <div>{props.obj.likes>0?props.obj.likes:0} 
            {props.obj.likes>0?<Link to={"/likes?username="+props.obj.username+"&postid="+props.obj.postID} > likes</Link>:" likes"}
            </div>
            <div>
                {props.obj.nocp>0?props.obj.nocp:0}
                <Link to={"/post?username="+localStorage.getItem("username")+"&postid="+props.obj.postID} onClick={e=>{
                    pushPostToStack(e,props.obj);
                    if(props.changePID){
                        props.changePID({...props.obj,postID:props.obj.postID});
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