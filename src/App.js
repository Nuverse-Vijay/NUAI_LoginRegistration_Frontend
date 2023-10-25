import './App.css';
import React from 'react';
import RegistrationComp from './components/RegistrationComp';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import LoginComp from './components/LoginComp';
import HomeComp from './components/HomeComp';
import LoginState from './context/LoginState';
import LogoutComp from './components/LogoutComp';
import MyTasksComp from './components/MyTasksComp';

function App() {
  return (
    <div className="App">
      <LoginState>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegistrationComp />}/>
          <Route path="" element={<LoginComp />}/>
          <Route path="/home" element={<HomeComp />}/>
          <Route path="/logout" element={<LogoutComp />}/>
          <Route path="/myTasks" element={<MyTasksComp/>}/>
        </Routes>
      </BrowserRouter>
      </LoginState>
      
      
        
    </div>
  );
}

export default App;
