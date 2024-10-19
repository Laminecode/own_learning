import axios from "axios";
const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4300/post/get_all');
    //   setpostget(response.data);
    //   console.log(response.data);
        return response.data.json()
    } catch (err) {
      console.log(err);
      return false
    }
  };

  export {fetchData}