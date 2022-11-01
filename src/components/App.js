import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './login/Login';
import Register from './register/Register';
import Home from './home/Home'; 


function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/' element={<Home/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
