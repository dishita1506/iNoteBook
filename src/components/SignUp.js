import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp(props) {
    //Using useNavigate() hook to redirect to some other page
    let navigate=useNavigate();
      
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})

    const handleSubmit=async(e)=>{
        //submit krne pr page reload na ho 
        e.preventDefault();
       
      const  {name,email,password}=credentials;

        //login krne pr we will be hitting an API (http://localhost:5000/api/auth/login)
        const response = await fetch("http://localhost:5000/api/auth/createUser", {


            method: "POST",
            headers: {
              "Content-Type": "application/json"
              
            },
            body:JSON.stringify({name,email,password})
          });

          //Login krne pr authtoken milra hai hume   ---->  {success: true, authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7I…U4NX0.NhHbKjC-e4Q4R6zKraTQ9Gkd1qDaXtwMKfwVqYgKi-E'}
          const json=await response.json();
          console.log(json);
           if(json.success){
            localStorage.setItem("token",json.authorizationToken);
            navigate("/");
            props.showAlert("Account created successfully...","success");
           }
           else{
            props.showAlert("Invalid credentials","danger");
           }
            

    }
     

    //ONCHANGE FUNCTION
    //Jab bhi input fields email and password ki value change hongi ye run hoga
    const onChange= (e)=>{
        setCredentials({...credentials,[e.target.name] : e.target.value});
        //console.log(credentials);
        }



  return (
    <div>
       <form onSubmit={handleSubmit}>

       <div className="mb-3">
       <h2 className='mt-1 mb-3'>SignUp to continue to iNoteBook...</h2>
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp"  onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange}  required minLength={5}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} required minLength={5}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
