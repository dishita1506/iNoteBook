
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NoteState from './context/NoteState';
import  Alert from './components/Alert';
import {useState} from "react";
// npm run both --> command to run react app as well as backend server (in package.json we have added one more value to script named both)

function App() {
   
  //UseState to set alert
  const [alert,setAlert]=useState(null);


  //SHOW ALERT FUNCTION TO SHOW ALERT
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }



  return (
    <>
    {/* We have used NoteState because we want to access value of state variable defined there */}
    <NoteState>
    <Router>
     <Navbar/>
     <Alert alert={alert}/>
     <div className="container">
      <Routes>
        
         <Route exact  path="/" element={<Home showAlert={showAlert}/>}/>
         <Route exact path="/about" element={<About />}/>
         <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
         <Route exact path="/signUp" element={<SignUp showAlert={showAlert}/>}/>
        </Routes>
        </div>
    </Router> 


    </NoteState>
    </>
  );
}

export default App;
