import { Routes, Route } from 'react-router-dom';

import Home from './client/home';
import Login from './client/Login';
import About from './client/about';
import Todo11 from './client/todo11';
import Todo13 from './client/todo13';
import Todo24 from './client/todo24';
//
export default function App(){
  return(
  <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/todo11" element={<Todo11 />} />
      <Route path="/todo13" element={<Todo13 />} />
      <Route path="/todo24" element={<Todo24 />} />
    </Routes>
  </div>
  )
}
