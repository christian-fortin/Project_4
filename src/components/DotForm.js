// This file is for the form to submit a new dot

// A Hook is a special function that lets you “hook into” React features. For example, useState is a Hook that lets you add React state to function components.
// ====================================================================================================================


import { useState } from "react"
// This is a way to “preserve” some values between the function calls — useState
import { useDispatch } from "react-redux"
// Used to call functions -- 410 Someone Check me on this
import {createDot} from '../features/dots/dotSlice'




const DotForm = () => {
// For each one:
// 1: the variable holding the state, 2: the function used to tell the computer to modify the state, 3: the initial state of the variable
    const [websiteName, setWebsiteName] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')
    const [rating, setRating] = useState('')
    const [tags, setTags] = useState('')

    const dispatch = useDispatch()
    // Just renaming it so we don't have to super wrap things

    // Handles what happens when the form is submitted
    const onSubmit = (e) => {
        // -- 410, Why do we preventDefault again?
        e.preventDefault()
        // Stops form from refreshing the screen

        dispatch(createDot({websiteName, description, url, rating, tags}))
        // Calls the function to create a dot with these params
        setWebsiteName()
        setDescription()
        setUrl()
        setRating()
        setTags()
    }


  return (
    <section className="form">
        <form onSubmit={onSubmit} action="">
            <div className="form-group">
                <label htmlFor="">Dot-Name</label>
                <input type="text" name='websiteName' id='websiteName' value={websiteName} onChange={(e) => setWebsiteName(e.target.value)}  />
            </div>

            <div className="form-group">
                <label htmlFor="">Description</label>
                <textarea type="text" name='description' id='description' value={description} onChange={(e) => setDescription(e.target.value)}/> 
            </div>

            <div className="form-group">
                <label htmlFor="">URL</label>
                <input type="text" name='url' id='url' value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="">Rating</label>
                <input type="text" name='rating' id='rating' value={rating} onChange={(e) => setRating(e.target.value)}  />
            </div>

            <div className="form-group">
                <label htmlFor="">Tags</label>
                <input type="text" name='tags' id='tags' value={tags} onChange={(e) => setTags(e.target.value)}  />
            </div>
            <div className="form-group">
                <button className="btn btn-block" type='submit'>
                    Submit
                </button>
            </div>
        </form>
    </section>
  )
}

export default DotForm