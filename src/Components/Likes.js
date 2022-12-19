const { useEffect,useState } = require("react");
const { useNavigate, useSearchParams } = require("react-router-dom");

function Likes(){
    const [likesArr,setLikesArr]=useState([]);
    const nav=useNavigate();
    const [params,setparams]=useSearchParams();

    useEffect(function(){
        fetch("http://localhost:8000/likes?postID="+params.get("postid"))
        .then(data=>data.json())
        .then(obj=>{ var arr=obj.likers;
            setLikesArr(arr);
        })
    })

    return(
        <div>
            <button onClick={e=>{ 
                
                nav(-1);

                //nav("/post?username="+localStorage.getItem("username")+"&postID="+params.get("postid"));
                
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