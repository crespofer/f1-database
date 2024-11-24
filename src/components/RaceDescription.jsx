import './RaceDescription.css'
import { Link } from 'react-router-dom';

function RaceDescription(props){

    return (
        <div className="container">
            <div className="header-container">
                <h1 className="title">{props.season} {props.raceName}</h1>
                <Link className="return-link" to="/">Return to Search</Link>
            </div>
            <p className="country">Country: {props.country}</p>
            <h2 className="circuit-name">{props.circuitName}</h2>
            <h3 className="date">Date: {props.date}</h3>
            <h4 className="round">Round: {props.round}</h4>
            <div className="line"></div>
        </div>  
    );
}

export default RaceDescription