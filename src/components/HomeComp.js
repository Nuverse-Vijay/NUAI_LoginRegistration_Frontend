import {useContext, useEffect, useState } from "react";
import NavbarComp2 from "./NavbarComp2";
import LoginContext from "../context/LoginContext";

export default function HomeComp(){
    
    const[imgSrc,setImgSrc]=useState('');
    const user = useContext(LoginContext);

    useEffect(()=>{

        fetch("http://13.235.227.152/api/getImage?userid="+ user.loggedInUser.userid)
        .then(resp=>resp.json())
        .then(url=>{console.log(url);
                    setImgSrc(url);
        });
    },[])

    return(
        <>
            <NavbarComp2/>
            <h2>Home Page</h2>
            <img src={imgSrc} className="img-thumbnail img-fluid" style={{width:"200px",height:"200px"}}/><br/>
            {/* <button onClick={getImage}>get image</button> */}
        </>
    )
}