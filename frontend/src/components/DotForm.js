import { useState } from "react"
import { useDispatch } from "react-redux"
import {createDot} from '../features/dots/dotSlice'




const DotForm = () => {
    const [websiteName, setWebsiteName] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')
    const [rating, setRating] = useState('')
    const [tags, setTags] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createDot({websiteName, description, url, rating, tags}))
        setWebsiteName()
        // dispatch(createDot({description}))
        setDescription()
        // dispatch(createDot({url}))
        setUrl()
        // dispatch(createDot({rating}))
        setRating()
        // dispatch(createDot({tags}))
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
                <input type="text" name='description' id='description' value={description} onChange={(e) => setDescription(e.target.value)}  />
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