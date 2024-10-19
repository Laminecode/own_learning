const db = require('../Moddles')
const bcrypt = require('bcrypt');
const session = require('express-session')

const Users = db.users

const adduser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(email,req.body)
    try {
        // Check if the email already exists
        const existingEmailUser = await Users.findOne({where : { email } });
        if (existingEmailUser) {
            return res.status(500).json({ message: "This email already exists" });
        }

        // Check if the username is already used
        const existingUsernameUser = await Users.findOne({where : { username } });
        if (existingUsernameUser) {
            return res.status(500).json({ message: 'Username already in use' });
        }

        // Create a new user
        const newUser = await Users.create({ username, email, password });

        // Respond with success message and user details
        res.status(200).json({ message: 'User created successfully', result: newUser.toJSON() });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(400).json({ message: error.message });
    }
};


const verifyuser = async(req,res)=>{
    const {email, password} = req.body
    await Users.findOne({where : { email }})
     .then(user=>{
        if(user){
            bcrypt.compare(password,user.password)
             .then((result) =>{
                if (!result)
                    res.status(400).json({message:"wronge password"})
                else{
                    const paylaod  = {
                        username : user.username,
                        email : user.email
                    }
                    req.session.user = paylaod; 
                    res.status(200).json({message:"login sucsfuly",user:user})
                    // res.json(user)
                }
             })
        }else{
            res.status(400).json({message:"invalide email"})
        }
     })
     .catch((err) => {
        console.log(err);
        res.status(400).json({message: err.message})
    })  
}

async function FindByEmail(req, res) {
    try {
      const { email } = req.body; // Extract email from request body
        
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
  
      const user = await Users.findOne({where : { email }})
  
      if (!user) {
        return res.status(404).json({ message: 'User not found',user:user,email:email});
      }
  
      res.json(user);
    } catch (err) {
      console.error('Error finding user:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

module.exports = {
    adduser,
    verifyuser,
    FindByEmail
}