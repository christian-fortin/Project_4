// This file is for the creation and placement and style of the DOT

// A Hook is a special function that lets you “hook into” React features. For example, useState is a Hook that lets you add React state to function components.
// ====================================================================================================================

import { useDispatch } from "react-redux"
// Used to call functions -- 410 Someone Check me on this
import { Link } from "react-router-dom"
// Used to go to other parts of the website
import {deleteDots} from '../features/dots/dotSlice'
// Brings in the function 'deleteDots' from the dotSlice file which basically facilitates the actions

const DotItem = ({dot}) => {
  // -- 410 How do we have access to the information on 'dot'
console.log(dot);
const dispatch = useDispatch()
    // Just renaming it so we don't have to super wrap things

  return (
    <div className="dot-container">
            <a href={dot.url} target="_blank" rel="noopener noreferrer" alt="dot">
                <div className="dot-itself">
                </div>
            </a>
        
        {/* <h2>{dot.websiteName}</h2> */}
        <div className="show-delete">
        <button onClick={() => dispatch(deleteDots(dot._id))} className="close" id="delete-dot">Delete</button>
        {/* To delete a dot */}
        <Link to={`/Show-dot/${dot._id}`} className="close" id="show">{dot.rating}</Link>
        {/* To go to the dot show page */}
        </div>
    </div>
  )
}

export default DotItem