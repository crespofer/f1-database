import f1Logo from '../assets/f1logo.png'
import drivers from '../assets/driver-gifs.gif'
import gitLogo from '../assets/githubImg.png'
import './Header.css';

function Header(){
    return (
        <div className="header">
            <img className="logo-image"src={f1Logo} alt=""/>
            <p>F1 Database</p>
            <a href="https://github.com/crespofer/f1-database"><img className="git-logo" src={gitLogo} alt=""/></a>
            <img className="drivers" src={drivers} alt=""/>
        </div>
    );

}

export default Header