import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import LogIn from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Register />}/>
      </Routes>
    </>
  );
}

export default App;
