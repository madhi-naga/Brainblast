
import ValidationSystem from "../Helpers/ValidationSystem";

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
        }
        return true;
    }
    return false;
}

export default ValidationController;