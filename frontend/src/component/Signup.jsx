import React from 'react'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup({onclick}) {
  const [User,setUser] = useState({
    username:'',
    email : '',
    password : ''
  })
  const [err ,seterr] = useState(null)
  const navigator = useNavigate();
  const handelinput = (event)=>{
    setUser(prev => ({...prev ,[event.target.name ]: event.target.value }))
  }
  const handelsubmit = async (event) => {
    event.preventDefault();
      const response = await axios.post('http://localhost:4300/signup', User)
      .then(res =>{
      if (res.status === 200) {
        onclick()
      } else {
        seterr(res.data.message);
      }
    })
    .catch(err=>{
      seterr(err.response.data.message);
    })
  };

  return (
      <form className='signup' onSubmit={handelsubmit}>
      <h2>Sign Up</h2>
            <input type="text" id="signupUsername" name="username"  onChange={handelinput} placeholder='Username' required/>
            <input type="text" id="signupEmail" name="email" onChange={handelinput} placeholder='Email' required/>
            <input type="password" id="signupPassword" name="password" onChange={handelinput} placeholder='Password' required/>
            <div className='err'>{err}</div>
            <button type="submit" className='submit'>Sign Up</button>
      </form>
  )
}

export default Signup