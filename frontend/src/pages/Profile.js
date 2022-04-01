import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import DotForm from "../components/DotForm"
import Spinner from '../components/Spinner'
import { getDots, reset } from '../features/dots/dotSlice'
import DotItem from "../components/DotItem"
import { Link } from "react-router-dom"

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const {user} = useSelector((state)=> state.auth)
  const { dots, isLoading, isError, message} = useSelector((state) => state.dots)
  console.log(dots);

// This is throwing an error
  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if(!user){
      navigate('/login')
    }
    dispatch(getDots())
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner/>
  }

  return (
    <div>
       {/* <h1 className="welcomeUser">Welcome {user && user.name} </h1> */}
      <section>
        <h1 id="profile-page-title">Your Dots</h1>
      </section>
    <DotForm/>
    {dots.length > 0 ? (
      <div className="dots-Container">
       
        {dots.map((dot)=> (
          <DotItem key={dot._id} dot={dot}/>
        ))}
      </div>
    ) : (<h3> You have not created any dots </h3>)}
    </div>
  )
}

export default Profile