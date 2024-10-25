import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Details() {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const Book = location.state?.Book;
  const [deletebtn, setDelete] = useState(false);

  useEffect(() => {
    if (!Book) return;
  
    // Remove any extra quotes or spaces from the stored email
    let user = localStorage.getItem('user');
    user = user ? user.replace(/^"|"$/g, '').trim().toLowerCase() : ''; // Clean up extra quotes
  
    const bookEmail = Book.UserEmail?.trim().toLowerCase();
  
    console.log(`User: "${user}", Book Email: "${bookEmail}"`);
  
    if (user === bookEmail) {
      console.log('User matches, enabling delete button.');
      setDelete(true);
    } else {
      console.warn('User does not match the book email.');
    }
  }, [Book]);
  
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
      const errorMessage = err.response?.data?.message || 'An error occurred while deleting the post.';
      alert(`Error: ${errorMessage}`);
    }
  };

  if (!Book) return <p>Loading book details...</p>;

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

        {deletebtn && (
          <button className="delete-button" onClick={deletePost}>
            Delete Post
          </button>
        )}
      </div>
    </div>
  );
}

export default Details;
