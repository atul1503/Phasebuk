import { Link } from "react-router-dom";


function Navigator() {
    return(
    <div>
    <Link to="/">Home</Link>
    <Link to="/notifications">Notifications</Link>
    <Link to="/findfriends">Find Friends</Link>
    </div>
    )
}

export default Navigator;