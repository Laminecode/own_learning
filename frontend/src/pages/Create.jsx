import axios from 'axios';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [imageURL,setImageURL] = useState(null)
  const [post, setPost] = useState({
    Title: '',
    summary: '',
    review:'',
    author:'',
    image: null,
    UserEmail: '',
    username:''
  });
 const navigate = useNavigate()
  const handleInput = (event) => {
    setPost((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  // const handleFileChange = (e) => {
  //   const formData = new FormData();
  //   const selected = formData.append('file', e.target.files[0]);
  //   if(selected)
  //     setImageURL(URL.createObjectURL(selected))
  //   else
  //     setImageURL(null)

  //   setPost({
  //     ...post,
  //     image: formData,
  //   });
  // };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let userlogin = localStorage.getItem('user');
        userlogin = userlogin && userlogin.replace(/^"|"$/g, ''); // Clean email if necessary

        if (!userlogin) {
          console.error('No user found in localStorage');
          return;
        }

        const response = await axios.post('http://localhost:4300/user', { email: userlogin });
        console.log(response.data);

        setPost((prev) => ({
          ...prev,
          UserEmail: response.data.email,
          username: response.data.username,
        }));
      } catch (e) {
        console.error('Error fetching user:', e);
      }
    };

    fetchUser();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append('file', selectedFile);

    if (selectedFile) {
      setImageURL(URL.createObjectURL(selectedFile));
    } else {
      setImageURL(null);
    }

    setPost({
      ...post,
      image: formData,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new FormData instance
    const formData = new FormData();

    // Append data to the formData
    formData.append('Title', post.Title);
    formData.append('summary', post.summary);
    formData.append('review', post.review);
    formData.append('author', post.author);
    formData.append('UserEmail', post.UserEmail);
    formData.append('username',post.username)
    formData.append('file', post.image.get('file')); 
    console.log(formData)
    
    axios.post('http://localhost:4300/post/create', formData)
        .then((res) => {
            if (res.status == 200) {
                console.log("The post was added successfully", res.data.result);
            }
            navigate('/Books')
        })
        .catch((err) => console.log(err.message));
};

  
  return (
<div className='create'>
    <form onSubmit={handleSubmit}>
      <label htmlFor="Title">Title:</label>
      <input type="text" id="Title" name="Title" value={post.Title} onChange={handleInput} required/>

      <label htmlFor="review">Review:</label>
      <input type='review' id="review" name="review" value={post.review} onChange={handleInput}/>

      <label htmlFor="author">Author:</label>
      <input type='text' id="author" name="author" value={post.author} onChange={handleInput}/>
      
      <label htmlFor="summary">Summary:</label>
      <textarea id="summary" name="summary" value={post.summary} onChange={handleInput}/>
      
      <label htmlFor="image">Image:</label>
      <input type="file" id="image" name="image" onChange={handleFileChange} />
      <div className='selcted'>
        {imageURL && <img src={imageURL} alt="Preview" style={{ maxWidth: '100px'}}></img>}
      </div>
      <button type="submit">Submit</button>
    </form>

</div>
  );
}

export default Create;
