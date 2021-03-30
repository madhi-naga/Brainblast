import React, { useState, useContext } from "react";
import {ScoreContext} from "../Contexts/ScoreContext";
import ValidationSystem from "../Helpers/ValidationSystem";
import {Redirect} from "react-router-dom";
import "./UsernameInputForm.css";

function UsernameInputForm() {
    const [username, setUsername] = useState("");
    const [checked,setChecked] = useState(false);
    const scoreContext = useContext(ScoreContext);

    function onClick(){
        
        var validate = ValidationSystem(username);
        if (validate !==1){
            if (validate ===2){
                scoreContext.setError("The username you entered was too short. Enter a username at least 3 characters long.");
            }
            else if (validate === 3){
                scoreContext.setError("The username you entered was too long. Enter a username 10 characters long or less.");
            }
            else{
                scoreContext.setUsername(username);   
            }
            setChecked(true);
        }
        
    }

    const onChange = (e) => {
        setUsername(e.target.value);
      };
    
    if (!checked){
        return (
            <div>
                <link
                    href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap"
                    rel="stylesheet"
                ></link>
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
  