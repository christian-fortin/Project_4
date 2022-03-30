// should I import createDot?
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import {deleteDots} from '../features/dots/dotSlice'

const DotItem = ({dot}) => {

const dispatch = useDispatch()

  return (
    <div className="dot-container">
            <a href={dot.url} target="_blank" rel="noopener noreferrer" alt="dot">
                <div className="dot-itself">
                </div>
            </a>
        
        {/* <h2>{dot.websiteName}</h2> */}
        <div className="show-delete">
        <button onClick={() => dispatch(deleteDots(dot._id))} className="close" id="delete-dot">Delete</button>
        <Link to="/login" className="close" id="show">Show</Link>
        </div>
    </div>
  )
}

export default DotItem