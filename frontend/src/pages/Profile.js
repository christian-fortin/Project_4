import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import DotForm from "../components/DotForm"

const Profile = () => {
  const navigate = useNavigate()
  const {user} = useSelector((state)=> state.auth)


  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  }, [user, navigate])


  return (
    <div>
      <section>
        <h1>Welcome {user && user.name} </h1>
        <p>Dots HERE</p>
      </section>
    <DotForm/>
    </div>
  )
}

export default Profile