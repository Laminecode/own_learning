import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserAcount({user}) {
  const [books, setBooks] = useState([]);
  const navigator = useNavigate();
console.log(user)
  useEffect(() => {
    axios.get(`http://localhost:4300/post/userpost/${user.email}`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch(err => {
        navigator('/')
        console.log(err);
      });
  },[user]); 
  
  return (
    <div className='Userpage'>
      {books.length === 0 ?
      <div>there is no book to post</div>
      :<div className='UserBooks'>
        {books.map(book => (
          <div className='booook' key={book.id}>{book.Title}</div>
        ))}
      </div> 
      } 
    </div>
  );
}

export default UserAcount;
