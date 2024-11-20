import { Link } from "react-router-dom"

function NotFoundPage(){
    return (
        <div>
            Page Not Found
            <Link to="/">
            <button>Return Home</button>
            </Link>
        </div>
    );

}

export default NotFoundPage