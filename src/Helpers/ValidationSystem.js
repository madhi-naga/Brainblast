
function ValidationSystem(username){
    if (username === ""){
        return 1;
    }
    else if (username.length < 3){
        return 2;
    }
    else if (username.length > 10){
        return 3;
    }
    else{
        return 4;
    }
}

export default ValidationSystem;