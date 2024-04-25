import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.tsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Protected from './components/Protected.tsx';
import Signup from './pages/Signup.tsx';
import Login from './pages/Login.tsx';
import StafferView from './pages/StafferView.tsx';
import RMView from './pages/RMView.tsx';
const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Protected />}>
            <Route path="/RMView" element={<RMView/>} /> 
            <Route path="/StafferView" element={<StafferView />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  rootElement
);