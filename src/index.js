import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Error from './Components/Error';
import FFriends from './Components/FFriends';
import Layout from './Components/Layout';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Notification from './Components/Notification';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<App/>}/>
          <Route path="home" element={<App/>} />
          <Route path="findfriends" element={<FFriends/>} />
          <Route path="notifications" element={<Notification/>} />
          <Route path="login" element={<Login/>}/>
          <Route path="Signup" element={<Signup/>}/>
          <Route path="*" element={<Error/>}/>
        </Route> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
