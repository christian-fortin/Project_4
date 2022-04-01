import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// Allows us to connect our backend routes to the front end.
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import Navigation from './components/Navigation';
import Show from './pages/Show';
// Brings in the components^

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'

import {useSelector} from 'react-redux'
import {loggedInUser} from './features/auth/authSlice'
// This^ was used as a tester

function App() {
  // const user = useSelector(loggedInUser)
  // useSelector((state)=> state.auth)
  // This^ was used as a tester
  return (
    <>
    {/* {user ? <p>'Logged In'</p> : <p>Not logged In</p>} */}
    
    <Router>
    <div className='container'>
      <Navigation/>
      {/* ^Navigation bar at the top */}
      <Routes>
        <Route path='/' element={<Profile/>}></Route>
        {/* Showing just a user's collection of dots */}
        <Route path='/Show-dot/:id' element={<Show/>}></Route>
        {/* Shows an individual dot */}
        <Route path='/Login' element={<Login/>}></Route>
        {/* Shows the login page */}
        <Route path='/Register' element={<Register/>}></Route>
        {/* Shows the register page */}
      </Routes>
    </div>
    </Router>
    {/* <ToastContainer/> */}
    </>
  );
}

export default App;
