import React,{useContext} from "react";
import { Link } from "react-router-dom";
import {ScoreContext} from "../Contexts/ScoreContext";
import './NavBar.css';



function Navbar () {
    const scoreContext =  useContext(ScoreContext);
    if (scoreContext.username!==null){
        return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
                <Link to={"/menu"}>
                    <div className="navbar-brand">Brainblast</div>
                </Link>
                <Link to={"/menu"}>
                    <li className="nav-item nav-link">Menu</li>
                </Link>
                <Link to={"/leaderboard/"}>
                    <li className="nav-item nav-link">Leaderboard </li>
                </Link>
                <Link to={"/instructions/"}>
                    <li className="nav-item nav-link">Instructions </li>
                </Link>
            </ul>
        </nav>

        );
    }
    else{
        return(<nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
                <Link to={"/"}>
                    <div className="navbar-brand">Brainblast</div>
                </Link>
            </ul>
        </nav>)
    }
}

export default Navbar;