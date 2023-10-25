import { useContext, useState } from "react";
import NavbarComp1 from "./NavbarComp1";
import { useNavigate } from "react-router-dom";
import LoginContext from "../context/LoginContext";

export default function LoginComp() {

    const init={
        userid:'',
        password:'',
    }

    const[credentials,setCredentials]=useState(init);
    const[loginError,setLoginError]=useState("");
    const navigate=useNavigate();
    const logContext=useContext(LoginContext);

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setCredentials({
            ...credentials,
            [name]:value,
        });
    };

    const handleSubmit= async (e)=>{
        e.preventDefault();
        console.log(credentials);
        try{
            const response= await fetch("http://127.0.0.1:8000/api/login",{
                        method:"post",
                        headers:{
                            'Content-Type':'application/json',
                        },
                        body:JSON.stringify(credentials),
                });

                if(response.ok){
                    const resp= await response.json();
                    if(resp.length===1)
                    { 
                        console.log("login successfull");
                        //set the return user details to context level
                        logContext.updateUser(resp[0]);
                        //navigate to home page
                        navigate('home');
                    }
                    else{
                        setLoginError("Invalid Userid or Password");
                        setCredentials(init);
                    }
                }
                else{
                    console.error("Error sending data : " + response.status);
                }

            }catch(error){
                console.error("Network error : " + error);
            }
            
    }

    return (
        <>
            <NavbarComp1 />
            <div className="row d-flex justify-content-center align-items-center p-5 h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white px-5">
                        <div className="card-body p-2 text-center">
                            <h2 className="p-3 mb-4">Login</h2>

                            <form>
                                <p className="text-danger">{loginError}</p>
                                <div className="form-outline mb-5">
                                    <label htmlFor="userid" className="form-label">User Id</label>
                                    <input type="text" className="form-control" name="userid" id="userid" placeholder="Enter userid..."
                                        value={credentials.userid} onChange={handleChange} />
                                </div>
                                <div className="form-outline mb-5">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" name="password" id="password" placeholder="Enter password..."
                                        value={credentials.password} onChange={handleChange} />
                                </div>
                                <div className="my-5">
                                    <button type="submit" className="btn btn-light" onClick={handleSubmit}>SUBMIT</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                {/* {JSON.stringify(credentials)} */}
            </div>
        </>
    )
}