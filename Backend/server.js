const express = require('express')
const cors = require('cors')
const router = require("./Routes/user.js") 
const post = require('./Routes/post.js')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser")

const app = express()
const corsOptions = {
    origin: ['http://localhost:5173'], // Change this to the actual origin of your client application
    credentials: true, // Allow cookies to be sent with the request
  };
  

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    name: 'cookie',
    cookie: { 
        secure: false ,
        maxAge: 1000*60*60*24,
        httpOnly: false,
    }
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use('/BookImage', express.static('BookImage'));
app.use('/',router)
app.use('/post',post)


app.listen(4300,() => {
    console.log('app is listing');
})
