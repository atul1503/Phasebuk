function Post(props) {

    if(Array.isArray(props.obj.imageUrl)) {
    return (
<div>
    <p>{props.obj.text}</p>
    <div>
    {props.obj.imageUrl.map(function(url) {
        <img src={url} alt="Abdra ka dabdra"/>
    })}
    </div>
</div>
    );
    }
    else {
        return (
            <div>
                <p>{props.obj.text}</p>
                <img src={props.obj.imageUrl}/>
            </div>
        );
    }
}


export { Post };