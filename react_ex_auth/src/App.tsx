import { Routes, Route } from 'react-router-dom';

import Home from './client/home';
import Login from './client/Login';
import About from './client/about';
//
export default function App(){
  return(
  <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </div>
  )
}
