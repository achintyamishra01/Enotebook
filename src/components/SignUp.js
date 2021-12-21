import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const SignUp = (props) => {
    const[credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
    let history=useNavigate();
    const handleClick=async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:4000/api/auth/createuser",{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
        });
        const json =await response.json();
        console.log(json);
        if(json.success){
            //save the authtoken  and redirect
            localStorage.setItem('token', json.authtoken);
            history("/");
            props.showAlert("Account created Successfully","success");
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }
    }
    
    
    const onChange=(e)=>{
        setCredentials({
            ...credentials,[e.target.name]:e.target.value
        })
    }
    return (
        <div>
             <div>
             <h1 className="my-2">Create an Enotebook Account </h1>
            <form onSubmit={handleClick}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter your Name</label>
                    <input type="text" className="form-control" id="name" value={credentials.name} name="name" aria-describedby="emailHelp" onChange={onChange}/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} name="email" aria-describedby="emailHelp" onChange={onChange}/>
                    <div id="emailHelp" className ="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"  valid={credentials.password} name="password" onChange={onChange}  minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword"  valid={credentials.cpassword} name="cpassword" onChange={onChange} minLength={5}  />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className ="form-check-label" hmtlfor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
        </div>
    )
}

export default SignUp
