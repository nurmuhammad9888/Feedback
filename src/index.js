import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./Context/AuthContext";
import {UserProvider} from "./Context/UserContext";
import "./styles.css"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <AuthProvider>
          <UserProvider>
            <App />
          </UserProvider>
      </AuthProvider>
  </BrowserRouter>
);
