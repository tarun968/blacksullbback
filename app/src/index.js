import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Contact from './pages/Contact';
import ProtectedRoute from './protectedroutes/protectRoutes';
import ProtectedRoute2 from './protectedroutes/protectRoute2';
import About from './pages/About';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import SignIn from './pages/Signin';
// import store from './store.';
import store from './store';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>
)

reportWebVitals();


// root.render(
//   <BrowserRouter>
//     <Routes>
//       {/* <Route path="/" element={<Home />} /> */}
//       <Route element = {<ProtectedRoute2/>} >
//       <Route element = {<Home/>}  path=''/>
//       </Route>      
      
//       {/* <Route path="/Signin" element={<SignIn />} /> */}
//       <Route element = {<ProtectedRoute2/>} >
//       <Route element = {<SignIn/>}  path='/Signin'/>
//       </Route>      
      

//       <Route path="/about" element={<About />} />
//       <Route path="/contact" element={<Contact />} />
      
//       <Route element = {<ProtectedRoute/>} >
//       <Route element = {<Edit/>}  path='Edit'/>
//       </Route>

//     </Routes>
//   </BrowserRouter>
// );
// reportWebVitals();
