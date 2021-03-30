import React, {useContext} from "react";
import {ScoreContext} from "../Contexts/ScoreContext";
import "./UsernameInputForm.css";

function UsernameInputForm() {

    function onClick(){
        console.log("clicked")
    }

    return (
        <div>
            <link
                href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap"
                rel="stylesheet"
            ></link>
            <h1 className ="titleHeader">BrainBlast!</h1>
            <div className = "inputContainer">
                <label className="inputLabel">Username</label>
                <input className="form-control" placeholder="Enter username"/>
                <small id="usernameHelp" className="form-text text-muted">Username must be 3 to 10 characters long</small>
                <button className="btn btn-dark" id="submitButton" onClick={onClick}>Submit</button>
            </div>
        </div>
    );
  }
  
export default UsernameInputForm;
  