import React,{useState,} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
      //Using useNavigate() hook to redirect to some other page
      let navigate=useNavigate();
      
    const [credentials,setCredentials]=useState({email:"",password:""})
    const handleSubmit=async(e)=>{
        //submit krne pr page reload na ho 
        e.preventDefault();

        //login krne pr we will be hitting an API (http://localhost:5000/api/auth/login)
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
              
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
          });

          //Login krne pr authtoken milra hai hume   ---->  {success: true, authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7I…U4NX0.NhHbKjC-e4Q4R6zKraTQ9Gkd1qDaXtwMKfwVqYgKi-E'}
          const json=await response.json();
          console.log(json);
          if(json.success){
            localStorage.setItem("token",json.authToken);
            
            
            //AGR LOGIN HO JATE HAI TO REDIRECT KRRDO HOME PAGE PR JHA NOTE RAKHE HUE HAI..
            navigate("/");
            props.showAlert("Logged in Successfully....","success");
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
  <h2 className='mt-1 mb-3'>Login to continue to iNoteBook...</h2>
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"  name='email' value={credentials.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={credentials.password} name='password' onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}







// import React from 'react'

// export default function Login() {
//   return (
//     <div>
//       <form>
//   <div className="mb-3">
//     <label htmlFor="email" className="form-label">Email address</label>
//     <input type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
//     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//   </div>
//   <div className="mb-3">
//     <label htmlFor="password" className="form-label">Password</label>
//     <input type="password" className="form-control" id="password"/>
//   </div>
  
//   <button type="submit" className="btn btn-primary">Submit</button>
// </form>
//     </div>
//   )
// }
