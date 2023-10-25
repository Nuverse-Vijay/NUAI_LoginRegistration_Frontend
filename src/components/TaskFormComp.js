import { useState } from "react";

export default function TaskFormComp(props){

    const [fields,setFields]=useState(props.data);

    const handleChange=(e)=>{

        const{name,value}=e.target;
        
        setFields({
            ...fields,
            [name]:value,
        })
    }


    const handleSubmit=async (e)=>{
        e.preventDefault();

        if(props.type==="Add"){
            //Logic to add task to db
            try{
                const response= await fetch("http://127.0.0.1:8000/api/addTask",{
                        method:"post",
                        headers:{
                            'Content-Type':'application/json',
                        },
                        body:JSON.stringify(fields),
                    });

                if(response.ok){
                    console.log("add task data send successfully");
                }
                else{
                    console.error("Error sending data : " + response.status);
                }

            }catch(error){
                console.error("Network error : " + error);
            }
            //disappear form after adding task
            props.changeDisplay(false);
        }
        else if(props.type==="Edit"){
            //Logic to edit task using taskId
            console.log("editing task....");
            try{
                const response= await fetch("http://127.0.0.1:8000/api/editTask",{
                        method:"post",
                        headers:{
                            'Content-Type':'application/json',
                        },
                        body:JSON.stringify(fields),
                    });

                if(response.ok){
                    console.log("edit task data send successfully");
                }
                else{
                    console.error("Error sending data : " + response.status);
                }
            }catch(error){
                console.error("Network error : " + error);
            }

            //disappear form after editing task
            props.changeDisplay(false)
        }
    }

    return(
        <div className="container-fluid d-flex justify-content-center">
            <div className="card bg-light" style={{width:'25rem'}}>
                <div className="card-body">
                    <h4 className="card-title p-3">{props.type} Task</h4>
                    <form>
                        <div className="form-outline mb-3">
                            <label htmlFor="taskName" className="form-label">Task Name</label>
                            <input className="form-control" type="text" name="taskName" id="taskName" required
                                   value={fields.taskName} placeholder="Enter Task Name..." onChange={handleChange}/>
                        </div>
                        <div className="form-outline mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" type="text" name="description" id="description" required
                                   value={fields.description} placeholder="Enter description..." onChange={handleChange}/>
                        </div>
                        <div className="form-outline mb-3">
                            <label htmlFor="date" className="form-label">Date</label>
                            <input className="form-control" type="date" name="date" id="date" required value={fields.date} onChange={handleChange}/>
                        </div>
                        <div className="form-outline mb-3">
                            <label htmlFor="time" className="form-label">Time</label>
                            <input className="form-control" type="time" name="time" id="time" required value={fields.time} onChange={handleChange}/>
                        </div>
                        <div className="my-4">
                            <button type="submit" className="btn btn-outline-success m-3" onClick={handleSubmit}>SUBMIT</button>
                            <button type="reset" className="btn btn-outline-danger" onClick={()=>{props.changeDisplay(false)}}>Cancel</button>
                        </div>
                    </form>
                    {/* {JSON.stringify(fields)} */}
                </div>
            </div>
        </div>
    )
}