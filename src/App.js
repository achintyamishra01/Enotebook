
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);

  }
  return (
    
    <>
    <NoteState>
      <Router> 
        <Navbar></Navbar>
        <Alert alert={alert}></Alert>
      <div className="container">

        <Routes>
          <Route  path="/" element={<Home showAlert={showAlert}></Home>}  >
        </Route>
          <Route   path="/about" element={<About></About>}  >
    
          
          </Route>
          <Route path="/login" element ={<Login showAlert={showAlert}></Login>}></Route>
        <Route path="/signUp" element={<SignUp showAlert={showAlert}></SignUp>}></Route>
        </Routes>
   </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
