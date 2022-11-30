function Post(props) {

    const Footer=<div>
        <div>{props.obj.likes>0 ? props.obj.likes : '0' } Likes</div>
        <div>{props.obj.nocp>0 ? props.obj.nocp : '0' } Comments</div>
    </div>;

    //other logic
    if(Array.isArray(props.obj.imageUrl)) {
    return (
<div>
    <p>{props.obj.text}</p>
    <div>
    {props.obj.imageUrl.map(function(url) {
        <img src={url} alt="Abdra ka dabdra"/>
    })}
    {Footer}
    </div>
</div>
    );
    }
    else {
        return (
            <div>
                <p>{props.obj.text}</p>
                <img src={props.obj.imageUrl}/>
                {Footer}
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