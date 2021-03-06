
import ValidationSystem from "../Helpers/ValidationSystem";
import axios from 'axios';
const urlBackend = 'https://brainblast-be.herokuapp.com';

function ValidationController(username,scoreContext){
    
   
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
            axios.post(`${urlBackend}/score/new`, {
                username: username
            })
            .then(resp => {
                //alert("Sucessfully created user");
            })
            .catch(err => {
                scoreContext.setError("The username is already taken, try again"); 
                scoreContext.setUsername(null);
            });  
        }
        return true;
    }
    return false;
}

export default ValidationController;