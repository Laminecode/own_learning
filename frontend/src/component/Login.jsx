import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login({onclick}) {
  const [err ,seterr] = useState(null)
  const navigator = useNavigate()
  const [userlogin, setUserlogin] = useState({
    email: '',
    password: ''
  })
  
  const handleinput = (event)=>{
    setUserlogin(prev=>({...prev,[event.target.name]: event.target.value}))
  }
  axios.defaults.withCredentials = true;
  const handlesubmit = async (event) =>{
    event.preventDefault()
     axios.post('http://localhost:4300/login',userlogin)
    .then(res=>{
      if(res.status === 200 ){
        onclick()
        navigator('/Books')
        localStorage.setItem('user',JSON.stringify(userlogin.email))
        console.log('login succf')
      }else{
        res.json().then(data =>{
          seterr(data.message)
          console.log(err);
        })
      }
    })
    .catch(err =>{
      seterr(err.response.data.message);
      // console.log(err.response.data.message)
    })
  }

  return (
    <div className='formstyle'>
      <form className='signin' onSubmit={handlesubmit}>
          <h2>Sign In</h2>
          <input type="text" id="signinUsername" name="email" onChange={handleinput} placeholder='Email' required/>
          <input type="password" id="signinPassword" name="password" onChange={handleinput} placeholder='Password' required/>
          <div className='err'>{err}</div>
          <button type="submit" className='submit'>Sign In</button>
      </form>
    </div>
  )
}

export default Login