const db = require('../Moddles')
const {Op} = require('sequelize')
const fs = require('fs').promises;
const path = require('path')
const dfs = require('fs')


const Posts = db.Posts

function get_all_post(req,res){
    Posts.findAll()
        .then((Post)=>{res.status(200).json(Post)})
        .catch(err=> res.status(400).json("error",err))
}


const create_Poste = async (req, res) => {
    try {
        const imageBuffer = await fs.readFile(req.files.file.path);
        const post = await Posts.create({
            Title: req.fields.Title,
            summary: req.fields.summary,
            review: req.fields.review,
            author: req.fields.author,
            UserEmail: req.fields.UserEmail,
            username: req.fields.username,
            filename : req.files.file.path,
            image: imageBuffer,
        });

        res.status(201).json({ result: post.toJSON() });
    } catch (error) {
        console.error('Error uploading post with image:', error);
        res.status(500).json({ error: 'Error uploading post with image.', error });
    }
};

  
  async function update_Poste(req, res) {
    const id = req.params.id;
    const imageBuffer = await fs.readFile(req.files.file.path);
    try {
      const post = await Posts.findByPk(id);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      post.Title = req.fields.Title;
      post.summary = req.fields.summary;
      post.review = req.fields.review;
      post.author = req.fields.author;
      post.filename = req.files.file.path;
      post.username = req.fields.username;
      post.UserEmail = req.fields.UserEmail;
      post.image = imageBuffer
  
      await post.save();
  
      res.status(200).json({ result: post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
  function delete_post(req, res) {
    const id = req.params.id;
  
    Posts.findByPk(id)
      .then((post) => {
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
  
        const imageFilename = post.filename;
  
        Posts.destroy({ where: { id: id } })
          .then(() => {
            if (imageFilename) {
              const imagePath = path.join(__dirname, imageFilename);
              try {
                fs.unlinkSync(imagePath);
              } catch (unlinkErr) {
                console.error(`Error deleting image file: ${unlinkErr.message}`);
                return res.status(200).json({ message: 'Error deleting image file.' });
              }
            }
            res.json({ message: 'The post and image deleted successfully' });
          })
          .catch((err) => {
            console.error(`Error deleting post: ${err.message}`);
            res.status(500).json({ message: `Error while deleting post: ${err.message}` });
          });
      })
      .catch((err) => {
        console.error(`Error fetching post: ${err.message}`);
        res.status(500).json({ message: `Error while fetching post: ${err.message}` });
      });
  }


  function find_by_title(req,res){
    const Title = req.params.Title
    Posts.findAll({where:{Title:{[Op.like]: `%${Title}%`}}})
    .then((result) => {
      if (result.length > 0) {
          res.json(result);
      } else {
          res.json({ message: 'No posts found with this title' });
      }
  })
  .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
  });
  }
function get_user_posts(req,res){
  const email = req.params.email
  Posts.findAll({where:{UserEmail:email}})
  .then(result=>{
    res.status(200).json(result)
    console.log(result)
  })
  .catch(err=>{
    res.status(400).json(err)
  })
}
 
module.exports = {
    get_all_post,
    create_Poste, 
    update_Poste,
    delete_post,
    find_by_title,
    get_user_posts
}