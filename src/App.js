
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    
    <>
    <NoteState>
      <Router> 
        <Navbar></Navbar>
        <Alert></Alert>
      <div className="container">

        <Routes>
          <Route  path="/" element={<Home></Home>}  >
        </Route>
          <Route   path="/about" element={<About></About>}  >
    
          
          </Route>
        </Routes>
   </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
