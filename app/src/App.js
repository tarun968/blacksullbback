import './App.css';
import { Routes, Route, Router, BrowserRouter} from 'react-router-dom'
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import SignIn from './pages/Signin';
import Edit from './pages/Edit';

import ProtectedRoute from './protectedroutes/protectRoutes';
import ProtectedRoute2 from './protectedroutes/protectRoute2';



function App() {
  return (
    <BrowserRouter>
         <Routes>
           {/* <Route path="/" element={<Home />} /> */}
           <Route element = {<ProtectedRoute2/>} >
           <Route element = {<Home/>}  path=''/>
          </Route>      
          
           <Route element = {<ProtectedRoute2/>} >
           <Route element = {<SignIn/>}  path='/Signin'/>
           </Route>      
          
    
           <Route path="/about" element={<About />} />
           <Route path="/contact" element={<Contact />} />
          
           <Route element = {<ProtectedRoute/>} >
           <Route element = {<Edit/>}  path='Edit'/>
           </Route>
    
         </Routes>
       </BrowserRouter>
    );
}

export default App;
