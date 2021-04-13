
import { useContext } from "react";
import { ScoreContext } from "../Contexts/ScoreContext";
import "./ErrorMessage.css";
import { Link } from "react-router-dom";

function ErrorMessage() {
    const scoreContext = useContext(ScoreContext);
    return (
        <div>
            <link
                href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap"
                rel="stylesheet"
            ></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
            <h1 className="titleHeader">BrainBlast!</h1>
            <h1 className="error">An error occured. {scoreContext.error}</h1>
            <Link to={"/"} role="button" className="btn btn-danger" id="backButton">Enter a new username </Link>
        </div>
    )
}

export default ErrorMessage;