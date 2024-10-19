import React, { useState, useEffect } from 'react';
import { Outlet, NavLink,useNavigate } from 'react-router-dom';
import logo_transparent from '../imges/logo_transparent.png';
import Form from '../component/Form';
import axios from 'axios';
import { FaAngleUp } from 'react-icons/fa';




function Homelayout({ login, setlogin, signup, setsignup,setuser,user}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get('http://localhost:4300/islogin')
      .then((res) => {
        if (res.data.valid) {
          setuser(res.data.user);
        } else {
          setuser('');
        }
      })
      .catch((err) => console.log(err));
    });

  function handelLogin() {
    setlogin(true);
  }

  function handelsignup() {
    setsignup(true);
  }

  const handleClickOutside = () => {
    setlogin(false);
    setsignup(false);
  };

  function displaylogin() {
    setlogin(true);
    setsignup(false);
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    let page = document.querySelector('.page');
    let form = document.querySelector('.Formloginup');
    let button1 = document.querySelector('.blogin');
    let button2 = document.querySelector('.bsignup');
    function handelremove() {
      page.removeEventListener('click', handleClickOutside);
    }
    form.addEventListener('click', handelremove);
    if (login) {
      button2.removeEventListener('click', handelsignup);
    }
    if (signup) {
      button1.removeEventListener('click', handelLogin);
    }
    if (login || signup) {
      page.addEventListener('click', handleClickOutside);
    } else {
      page.removeEventListener('click', handleClickOutside);
    }
  });

  function handleLogout () {
    axios.post('http://localhost:4300/logout')
      .then(response => {
        if (response.data.success) {
          console.log('Logout successful');
          navigate('/')
        } else {
          console.error('Logout failed:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  }

  
  return (
    <div className='page'>
      <div className='Formloginup'>
        {login && <Form login={login} signup={signup} onclick1={displaylogin} onclick2={() => setlogin(false)} onclick3={() => setlogin(false) || setsignup(true)} />}
        {signup && <Form login={login} signup={signup} onclick1={displaylogin} onclick2={() => setlogin(false)} onclick3={() => setlogin(false) || setsignup(true)} />}
      </div>
      <header>
        <nav>
          <img src={logo_transparent} alt='logo' />
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/about'>About</NavLink>
          {user === '' ? (
            <div className='join'>
              <button className='blogin' onClick={handelLogin}>
                Log in
              </button>
              <div className='vertical-line'></div>
              <button className='bsignup' onClick={handelsignup}>
                join
              </button>
            </div>
          ) : (
            <div className='loginUser'>
              {user.username}
              <FaAngleUp onClick={toggleDropdown} className={showDropdown && 'drop-icon'}/>
              {showDropdown && (
                <div className='flex flex-col droplist'>
                  <ul className='flex flex-col gap-4'>
                    <li onClick= {()=>{
                      navigate(`/${user.username}`)
                    }}>Profil</li>
                    <hr className='hr_drop'/>
                    <li>Setting</li>
                    <hr className='hr_drop'/>
                    <li onClick= {handleLogout}>Logout</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </nav>
      </header>
      <main className='mainpage'>
        <Outlet/>
      </main>
    </div>
  );
}

export default Homelayout;
