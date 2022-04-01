import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DotForm from '../components/DotForm';
import Spinner from '../components/Spinner';
import { getDots, reset } from '../features/dots/dotSlice';
import DotItem from '../components/DotItem';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const Show = () => {

  const [dot, setDot] = useState({})

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams()

  const { user } = useSelector((state) => state.auth);
  const { dots, isLoading, isError, message } = useSelector((state) => state.dots);
  
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }



    dispatch(getDots());

    setDot(dots.find((d) => d._id === id ))

    return () => {



      dispatch(reset());
    };


  }, [user, navigate, isError, message, dispatch]);


  return (
    <div className="showPageContainer">
      <div className='showPage-dot-Container'>
        <DotItem key={dot._id} dot={dot}/>
        </div>
      <div className='dot-info-container'>
        <p> Website Name: <span className='showPage-span'>{dot.websiteName}</span></p>
        <p>Description: <span className='showPage-span'>{dot.description}</span> </p>
        <a href={dot.url}target="_blank" rel="noopener noreferrer"><p>URL: <span className='showPage-span' id='showPage-URL'>{dot.url}</span></p></a>
        <p>Rating: <span className='showPage-span'>{dot.rating}</span> </p>
        <p>Tags: <span className='showPage-span'>{dot.tags}</span> </p>
      </div>
    </div>
  );
};

export default Show;
