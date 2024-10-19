import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Details() {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const Book = location.state?.Book; 
  const [deletebtn,setdelete] = useState(false)

  // useEffect(async() => {
  //   try {
  //     await axios.post(`http://localhost:4300/post/isAuth`, {
  //       headers: {
  //         userEmail: Book.UserEmail,
  //         username: Book.username,
  //       },
  //     });
  //     setdelete(true)
  //   } catch (err) {
  //     console.error('Error deleting post:', err);
  //   }
  // }, []);

  const deletePost = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete(`http://localhost:4300/post/delete/${id}`, {
        headers: {
          userEmail: Book.UserEmail,
          username: Book.username,
        },
      });
  
      if (response.status === 200) {
        alert('Post deleted successfully!');
        navigate('/Books');
      }
    } catch (err) {
      console.error('Error deleting post:', err);
  
      // Display the error message from the backend, if available
      if (err.response && err.response.data) {
        alert(`Error: ${err.response.data.message}`);
      } else {
        alert('An error occurred while deleting the post.');
      }
    }
  };

  if (!Book) return null; 

  return (
    <div className="BookDetails">
      <div className="left">
        <div className="Dusername">{Book.username}</div>
        <div className="Ddate">{new Date(Book.createdAt).toLocaleDateString()}</div>
        <div className="Book-image">
          {Book.filename ? (
            <img src={`http://localhost:4300/${Book.filename}`} alt="Post Image" />
          ) : (
            <div>No Image Available</div>
          )}
        </div>
      </div>

      <div className="right">
        <div className="dtitle">{Book.Title}</div>
        <div><strong>Summary:</strong></div>
        <div className="dsummary">{Book.summary}</div>
        <div><strong>Review:</strong></div>
        <div className="dreview">{Book.review}</div>
        <div className="dauthor"><strong>Author:</strong> {Book.author}</div>

        <button className="delete-button" onClick={deletePost}>
          Delete Post
        </button>
      </div>
    </div>
  );
}

export default Details;
