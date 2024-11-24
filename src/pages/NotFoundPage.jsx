import { Link } from "react-router-dom"
import errorImage from "../assets/maxKicking.jpg"
import "./NotFoundPage.css"

function NotFoundPage(){
    return (
        <div className="container">
            <img className="error-image" src ={errorImage} alt="Error"></img>
            <p className="error-text">Oops, this page doesn't exist! &gt;:(</p>
            <Link to="/">
            <button>Return to Search</button>
            </Link>
        </div>
    );

}

export default NotFoundPage