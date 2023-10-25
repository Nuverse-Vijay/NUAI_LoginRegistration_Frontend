import { useState } from "react";
import LoginContext from "./LoginContext";

const LoginState=(props)=>{

    const [loggedInUser,setLoggedInUser]=useState({});

    const updateUser=(info)=>{
        setLoggedInUser(info);
    }

    return(
        <>
            <LoginContext.Provider value={{loggedInUser,updateUser}}>
                {props.children}
            </LoginContext.Provider>
        </>
    )
}

export default LoginState;