const { useEffect,useState } = require("react");
const { useNavigate, useSearchParams } = require("react-router-dom");

function Likes(){
    const [likesArr,setLikesArr]=useState([]);
    const nav=useNavigate();
    const [params,setparams]=useSearchParams();

    useEffect(function(){
        fetch("http://localhost:8000/likes?postID="+params.get("postid"))
        .then(data=>data.json())
        .then(arr=>{
            setLikesArr(arr);
        })
    })

    return(
        <div>
            <button onClick={e=>{ 
                
                nav(-1)
                
                }}>←---Back to Post</button>
            <ul>
                {likesArr.map(function(item){
                    return(
                        <li key={item}>{item}</li>
                    );
                })}
            </ul>
        </div>
    )
}


export default Likes;