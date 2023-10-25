import React, { useState } from "react";
import NavbarComp1 from "./NavbarComp1";

export default function RegistrationComp() {

    // initial field values in the form
    const initailData = {
        name: '',
        userid:'',
        password: '',
        email: '',
        contact:'',
        birthdate:'',
        address:'',
    };

    const [formData, setFormData] = useState(initailData);
    const [msg, setMsg] = useState("");
    //for image file
    const [imgFile,setImgFile]=useState(null);
    //for src attribute of image tag
    const [imgSrc,setImgSrc]=useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
        //to save form data except image 
        try{
                //Post the formdata to db using fetch api
                const response= await fetch("http://13.235.227.152/api/register",{
                    method:"post",
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify(formData),
                });
                
                if(response.ok){

                    console.log("data send successfully");
                    const resp= await response.json();
                    console.log("Response : " + JSON.stringify(resp));
                    //Display message after successful registration
                    setMsg("Registration Successfull");
                    //Empty the input field values
                    setFormData(initailData);
                    setImgFile(null);
                    setImgSrc(null);
                    

                    //upload image separately after inserting registration data
                    const imgData = new FormData();
                    imgData.append('image', imgFile);
                    //post image to upload image api
                    const imgResponse= await fetch("http://13.235.227.152/api/uploadImage?userid="+formData.userid,{
                                            method:"post",
                                            body:imgData,
                                        });

                    if(imgResponse.ok){
                        console.log("Image send successfully");
                        console.log(JSON.stringify(imgResponse.json()));
                    }
                    else{
                        console.error("Error sending image : " + imgResponse.status);
                    }
                }
                else{
                    console.error("Error sending data : " + response.status);
                }
            }catch(error){
                console.error("Network error : " + error);
            }
    };

    const handleChange = (e) => {
        
        const { name, value, type, files } = e.target;
        //for image file
        if (type === 'file') {
            setImgFile(files[0]);

            const reader = new FileReader();
            reader.onload = () => {
                 setImgSrc(reader.result);
            };
            reader.readAsDataURL(files[0]);
        }
        //for other the image file data
        else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    return (
        <div>
            <NavbarComp1/>
            <div className="row d-flex justify-content-center align-items-center p-5 h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white px-5">
                        <div className="card-body p-2 text-center">
                            <h2 className="p-3">Registration Form</h2>
                            
                                <form>
                                    <div className="form-outline mb-4">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" name="name" id="fullname" placeholder="Enter name..."
                                            value={formData.name} onChange={handleChange} />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label htmlFor="userid" className="form-label">User ID</label>
                                        <input type="text" className="form-control" name="userid" id="userid" placeholder="Enter userid..."
                                            value={formData.userid} onChange={handleChange} />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" name="password" id="password" placeholder="Enter password..."
                                            value={formData.password} onChange={handleChange} />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" name="email" id="email" placeholder="Enter email..."
                                            value={formData.email} onChange={handleChange} />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label htmlFor="contact" className="form-label">Contact</label>
                                        <input type="contact" className="form-control" name="contact" id="contact" placeholder="Enter contact..."
                                            value={formData.contact} onChange={handleChange} />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label htmlFor="birthdate" className="form-label">BirthDate</label>
                                        <input type="date" className="form-control" name="birthdate" id="birthdate" placeholder="Enter birthdate..."
                                            value={formData.birthdate} onChange={handleChange} />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input type="text" className="form-control" name="address" id="address" placeholder="Enter Address..."
                                            value={formData.address} onChange={handleChange} />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <img src={imgSrc} className="img-thumbnail img-fluid" style={{width:"100px",height:"100px"}}/><br/>
                                        <label htmlFor="image" className="form-label">Upload profile picture</label>
                                        <input type="file" className="form-control" name="image" id="image" onChange={handleChange} />
                                    </div>
                                    <div className="my-4">
                                        <button type="submit" className="btn btn-light" onClick={handleSubmit}>SUBMIT</button>
                                    </div>
                                </form>

                                <p className="text-success">{msg}</p>
                            
                        </div>
                    </div>
                </div>
            </div>
            {/* {JSON.stringify(formData)} */}
        </div>
    )
}