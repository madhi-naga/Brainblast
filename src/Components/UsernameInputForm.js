import React, { useState} from "react";
import {ScoreContext} from "../Contexts/ScoreContext";
import {useContext} from "react";
import ValidationController from "../Helpers/ValidationController";
import {Redirect} from "react-router-dom";
import "./UsernameInputForm.css";

function UsernameInputForm() {
    const [username, setUsername] = useState("");
    const [checked,setChecked] = useState(false);
    const scoreContext =  useContext(ScoreContext);

    function onClick(){
        setChecked(ValidationController(username,scoreContext));
    }

    const onChange = (e) => {
        setUsername(e.target.value);
      };
    
    if (!checked){
        return (
            <div>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"/>
                <h1 className ="titleHeader">BrainBlast!</h1>
                <div className = "inputContainer">
                    <label className="inputLabel">Username</label>
                    <input className="form-control" onChange={onChange} placeholder="Enter username"/>
                    <small id="usernameHelp" className="form-text text-muted">Username must be 3 to 10 characters long</small>
                    <button className="btn btn-dark" id="submitButton" onClick={onClick}>Submit</button>
                </div>
            </div>
        );
    }
    else{
        return <Redirect to='/menu'/>;
    }
  }
  
export default UsernameInputForm;
  