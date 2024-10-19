import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home({setlogin}) {
  const [displayBtn,setdisplaybtn] = useState(false)
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  useEffect(()=>{
    axios.get("http://localhost:4300/islogin")
      .then(res =>{
         if (res.data.valid){
          setdisplaybtn(true)
         }else{
          setdisplaybtn(false)
         }
      })
      .catch(err => console.log(err))
  })

  const handleClick = ()=>{
    console.log(displayBtn)
    if (!displayBtn){
      setlogin(true)
    }else{
      navigate('/Books')
    }
  }

  return (
    <div className='Home'>
      <button type='button' className='Booking' onClick={handleClick}>Start Booking</button>
      <div className='welcome-message' style={{textAlign: 'justify',textJustify: 'inter-word', lineHeight: '2'}}>
        <div className='welcome'> Welcome to BookishVista - Your Literary Escape! 📚✨</div>
        <div className='message'>
            Embark on a journey through captivating books at BookishVista. Whether you're a seasoned reader or new to the world of words, you're in the right place. Explore our curated book reviews, discover favorite authors, and join our community of book enthusiasts. Get ready to embark on a literary adventure with us! Happy reading!
         </div>
      </div>
    </div>
  );
}

export default Home;
