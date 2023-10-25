import { useNavigate } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import { useContext } from "react";

export default function LogoutComp(){

    const user=useContext(LoginContext);
    user.updateUser({});
    
    const navigate=useNavigate();
    navigate('/');
}