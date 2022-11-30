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
    <Footer obj={props.obj}/>
    </div>
</div>
    );
    }
    else {
        return (
            <div>
                <p>{props.obj.text}</p>
                <img src={props.obj.imageUrl} alt="Abra ka dabra" />
                <Footer obj={props.obj}/>
            </div>
        );
    }
}

function Footer(props){
    return(
        <div>
            <div>{props.obj.likes>0?props.obj.likes:0} 
            <Link to="/likes" onClick={e=>{localStorage.setItem("postID",props.obj.postID)}}>likes</Link>
            </div>
            <div>
                <Link to="/post" onClick={e=>{localStorage.setItem("postobj",props.obj)}}>Comments</Link>
            </div>
        </div>
    );

}


export { Post };