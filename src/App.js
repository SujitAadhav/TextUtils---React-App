import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import React, {useState} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) =>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
        setAlert(null)
      }, 1500);
  }

  const toggleMode = () =>{
    if(mode === 'dark'){
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled", "success")
      document.title = 'TextUtils - Light Mode'
      setTimeout(() => {
        document.title = 'TextUtils'
      }, 1500);
    }else{
      setMode('dark');
      document.body.style.backgroundColor = '#010416';
      showAlert("Dark mode has been enabled", "success")
      document.title = 'TextUtils - Dark Mode'
      setTimeout(() => {
        document.title = 'TextUtils'
      }, 1500);
    }
  }


  return (
    <>
    <Router>
      <Navbar title="TextUtils" aboutText="About" mode={mode} toggleMode={toggleMode}/>
      <Alert alert={alert}/>
          <Routes>
            <Route exact path="/about" element={<About/>} />
            <Route exact path="/" element={<TextForm heading="Try TextUtils - word counter, character counter, remove extra spaces" mode={mode} showAlert={showAlert}/>} />
          </Routes>
    </Router>
    </>

  );
}

export default App;
