import React ,{useEffect} from "react";
import { Link ,useLocation,useNavigate} from "react-router-dom";

//USELOCATION HOOK
//It is used to give current location of react component...
const  Navbar=()=>{
  let location=useLocation();
  useEffect(()=>{
    console.log(location.pathname);
  },[location]);
  
  //USENAVIGATION HOOK
  //LogOut handle
  const navigate=useNavigate();
  const handlelogOut=()=>{
    //Jo user logged in hai uska token localstorage m pda hai jab vo logout krta hai to localstorage s vo token delete krna hai
    localStorage.removeItem("token");

    //uske baad login page pr redirect kr dena hai usko
    navigate("/login");
  }
   return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">iNoteBook</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""} `} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
    
      </ul>
      {/* Agar koi bnda logged in hai to usko loginin Signup nhi dikhao usko logout ka button dikao */}

      {!localStorage.getItem("token")?<form className="d-flex">
       <Link to="/login" className=" btn btn-danger mx-1" role="button">Login</Link>
       <Link to="/signup" className=" btn btn-danger " role="button">SignUp</Link>
      </form>:<button onClick={handlelogOut} className="btn btn-danger">Log Out</button>}
    </div>
  </div>
</nav>
   )
}

export default Navbar;