import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';
import { IoMdAddCircle } from 'react-icons/io'; // Add icon for the create button

function Books({ user }) {
  const [postget, setPostGet] = useState([]);
  const [Title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Fetch books based on the search query
  useEffect(() => {
    const search = async () => {
      setLoading(true); // Start loading indicator
      try {
        if (Title.trim()) {
          const response = await axios.get(`http://localhost:4300/post/getTitle/${Title}`);
          if (response.data.length > 0) {
            setPostGet(response.data);
            setErrorMessage(''); // Clear error message if books found
          } else {
            setPostGet([]);
            setErrorMessage('No books found with the given title.');
          }
        } else {
          fetchData(); // Fetch all books if Title is empty
        }
      } catch (err) {
        console.error(err);
        setErrorMessage('Error fetching books.');
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    search();
  }, [Title]);

  // Fetch all books (for initial load or when Title is cleared)
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4300/post/get_all');
      setPostGet(response.data);
      setErrorMessage(''); // Clear error message on success
    } catch (err) {
      console.error(err);
      navigate('/'); // Navigate to home on error
      setErrorMessage('Error fetching books.');
    } finally {
      setLoading(false);
    }
  };

  const handleDetails = (post) => {
    navigate(`/details/${post.id}`, { state: { Book: post } });
  };

  const goToCreatePage = () => {
    navigate('/create'); // Navigate to the "Create" page
  };

  return (
    <div className="Books_page">
      <div className="start">
        Dive into captivating reads and discover your next favorite book.
      </div>

      <div className="search">
        <input
          type="search"
          placeholder="Search..."
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <IoMdSearch className="search-icon" />
      </div>

      {/* Create Page Button/Icon */}
      <div className="create-button-container">
        <button className="create-button" onClick={goToCreatePage}>
          Create New Post
        </button>
        <IoMdAddCircle
          className="create-icon"
          size={30}
          onClick={goToCreatePage}
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : postget.length === 0 ? (
        <div>No books available.</div>
      ) : (
        <div className="Book_list">
          {postget.map((post) => (
            <div
              key={post.id}
              className="post-container"
              onClick={() => handleDetails(post)}
            >
              <div className="infoG">
                <div className="username">{post.username}</div>
                <div className="post-date">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="post-title">{post.Title}</div>
              <div className="post-image">
                {post.filename && (
                  <img
                    src={`http://localhost:4300/${post.filename}`}
                    alt="Post Image"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Books;
