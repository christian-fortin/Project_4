import { useState } from "react"
import { useDispatch } from "react-redux"
import {createDot} from '../features/dots/dotSlice'




const DotForm = () => {
    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()

        dispatch(createDot({text}))
        setText()
    }
  return (
    <section className="form">
        <form onSubmit={onSubmit} action="">
            <div className="form-group">
                <label htmlFor="">Dot</label>
                <input type="text" name='text' id='text' value={text} onChange={(e) => setText(e.target.value)}  />
            </div>
            <div className="form-group">
                <button className="btn btn-block" type='submit'>
                    Add a Dot
                </button>
            </div>
        </form>
    </section>
  )
}

export default DotForm