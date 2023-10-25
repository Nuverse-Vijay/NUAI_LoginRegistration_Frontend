import { useContext, useEffect, useState } from "react";
import LoginContext from "../context/LoginContext";
import NavbarComp2 from "./NavbarComp2";
import TaskFormComp from "./TaskFormComp";

export default function MyTasks() {

    //for tasks retrieved from db
    const [tasks, setTasks] = useState([]);
    //
    const user = useContext(LoginContext);
    //add or edit form
    const [formType,setFormType]=useState("");
    //to display task form
    const [formDisplay,setFormDisplay]=useState(false);
    //for input field data
    const [formData,setFormData]=useState({
        taskId:'',
        taskName:'',
        description:'',
        date:'',
        time:'',
        userid: user.loggedInUser.userid,
    });
    //for useEffect rendering
    const [isdeleting,setIsDeleting]=useState(false);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/tasks?id=" + user.loggedInUser.userid)
            .then(resp => resp.json())
            .then(response => {
                setTasks(response);
            });

    }, [formDisplay,isdeleting]);

    const deleteTask = async (id) =>{
        await fetch("http://127.0.0.1:8000/api/deleteTask?id=" + id)
            .then(resp => resp.json())
            .then(response => {
                setIsDeleting(true);
                console.log(response);
                console.log("task deleted");
            });
    }

    return (
        <>
            <NavbarComp2 />
            <div className="p-3">
                <button className="btn btn-outline-success" onClick={()=>{setFormDisplay(true);setFormType("Add")}}>Add New Task</button>
            </div>
            {formDisplay && <TaskFormComp type={formType} changeDisplay={setFormDisplay} data={formData}/>}
            <div className="d-flex justify-content-start mt-3">
            {
                tasks.map((task) => {
                    return <div className="card p-4 m-3 shadow bg-light" style={{width:'18rem'}}>
                                <div className="card-body">
                                    <h5 className="card-title">{task.taskName}</h5>
                                    <p className="card-text">{task.description}</p>
                                    <p>Date : {task.date}</p>
                                    <div className="d-flex justify-content-between align-items-end">
                                        <button className="btn btn-outline-primary px-4" onClick={()=>{setFormDisplay(true);setFormType("Edit");setFormData(task)}}>Edit</button>
                                        <button className="btn btn-outline-danger" onClick={()=>{deleteTask(task.taskId);setIsDeleting(false)}}>Delete</button>
                                    </div>
                                </div>
                            </div>

                })
            }
            </div>
        </>
    )

}