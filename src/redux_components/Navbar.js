import { useDispatch } from "react-redux"
import { Link } from "react-router-dom" 

export default function Navbar(){
    const dispatch=useDispatch();

    return(
        <div>
            <Link to="/">Home</Link>
            <Link onClick={function(e){
                dispatch({
                    type: "Logout"
                })
            }}> Log out</Link>
        </div>
    )

}