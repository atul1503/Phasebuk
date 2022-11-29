const { useState } = require("react");
const { useNavigate } = require("react-router-dom");

function Signup(){
    const nav=useNavigate();
    const [form,setForm]=useState({
        username:null,
        password:null,
        rep_password:null,
        name:null,
        age:null,
        status:null,
        location:null
    });


    function validate(){
        if(form.password!==form.rep_password) return false;
        //more validation might be added later

        return true;
    }

    function createProfile(e){

        if(!validate()) return;
        fetch("http://localhost:8000/signup",{
            method: 'POST',
            headers:{
                "Content-Type":'Application/json',
            },
            body : JSON.stringify(form) 
        })
        .then(data=>data.json())
        .then(obj=>{
            if(obj.success){
                localStorage.setItem("username",form.username);
                nav("/home");
            }
        })
    }

 return(
<div>
    <label for="Username">Username</label>
    <input type="text" name="Username" onChange={e=>{setForm({...form,username: e.target.value})}}></input>
    <label for="Password">Password</label>
    <input type="text" name="Password" onChange={e=>{setForm({...form,password: e.target.value})}}></input>
    <label for="RepeatPassword">Retype Password</label>
    <input type="text" name="RepeatPassword" onChange={e=>{setForm({...form,rep_password: e.target.value})}}></input>
    <label for="Name">Name</label>
    <input type="text" name="Name" onChange={e=>{setForm({...form,name: e.target.value})}}></input>
    <label for="Age">Age</label>
    <input type="text" name="Age" onChange={e=>{setForm({...form,age: e.target.value})}}></input>
    <label for="Status">Status</label>
    <input type="text" name="Status" onChange={e=>{setForm({...form,status: e.target.value})}}></input>
    <label for="Location">Location</label>
    <input type="text" name="Location" onChange={e=>{setForm({...form,location: e.target.value})}}></input>

    <button onClick={createProfile}></button>
</div>
 )  
}


export default Signup;