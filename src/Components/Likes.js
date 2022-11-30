const { useEffect,useState } = require("react");
const { useNavigate } = require("react-router-dom");

function Likes(){
    const [likesArr,setLikesArr]=useState([]);
    const nav=useNavigate();

    useEffect(function(){
        fetch("http://localhost:8000/likes?postID="+localStorage.getItem("postID"))
        .then(data=>data.json())
        .then(arr=>{
            setLikesArr(arr);
        })
    })

    return(
        <div>
            <button onClick={e=>{ localStorage.removeItem("postID"); nav(-1)}}>←---Back to Post</button>
            <ul>
                {likesArr.map(function(item){
                    return(
                        <li key={item}>item</li>
                    );
                })}
            </ul>
        </div>
    )
}


export default Likes;