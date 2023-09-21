import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from "./store";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Error from './Components/Error';
import FFriends from './Components/FFriends';
import Layout from './Components/Layout';
import Login from './redux_components/Login';
import Signup from './Components/Signup';
import Likes from './Components/Likes';
import Comments from './Components/Comments';
import Notification from './Components/Notification';
import Logout from './Components/Logout';
import { BrowserRouter, Routes,Route } from 'react-router-dom';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route index element={<App/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="signup" element={<Signup/>}/>
      <Route path="comments" element={<Comments/>}/>
    </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
