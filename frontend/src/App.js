import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import Navigation from './components/Navigation';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
import {useSelector} from 'react-redux'
import {loggedInUser} from './features/auth/authSlice'

function App() {
  const user = useSelector(loggedInUser)
  useSelector((state)=> state.auth)
  return (
    <>
    {user ? <p>'Logged In'</p> : <p>Not logged In</p>}
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
    {/* <ToastContainer/> */}
    </>
  );
}

export default App;
