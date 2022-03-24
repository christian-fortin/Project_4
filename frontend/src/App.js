import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import Navigation from './components/Navigation';

function App() {
  return (
    <>
    <Router>
    <div className='container'>
      <Navigation/>
      <Routes>
        <Route path='/' element={<Profile/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Register' element={<Register/>}></Route>
      </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;
