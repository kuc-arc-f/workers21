import { Routes, Route } from 'react-router-dom';

import Home from './client/home';
import About from './client/about';
import Todo11 from './client/todo11';
import Todo24 from './client/todo24';
//
export default function App(){
  return(
  <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/todo11" element={<Todo11 />} />
      <Route path="/todo24" element={<Todo24 />} />
    </Routes>
  </div>
  )
}
