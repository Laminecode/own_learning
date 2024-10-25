const session = require('express-session')


function islogin(req,res){
    if(req.session.user){
        return res.json({valid:true,user:req.session.user})
    }else{
        return res.json({valid:false})
    }
}

function isAuth(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}
function isAuth_creat(req, res, next) {
    const  email = req.fields.UserEmail;
    const username = req.fields.username;
    console.log(req.files)
    console.log(req.fields);
    const sessionUser = req.session.user;
    if (!sessionUser || (sessionUser.email !== email || sessionUser.username !== username)) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    req.file = req.files
    next();
}

function isAuth_delete(req,res,next) {
  const email = req.headers.useremail;
  const username = req.headers.username;
  const sessionUser = req.session.user;
  console.log(email,username,"klk;k;k;lk';k;;klk;")
  if (!sessionUser||sessionUser.email != email || sessionUser.username != username) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  console.log("klk;k;k;lk';k;;klk;")
  // return res.status(200)
  next()
}


function logout(req, res) {
    console.log('klsjdflkajsdklfjaskl')
    if (req.session.user) {
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.clearCookie('cookie');
        return res.json({ success: true, message: 'Logout successful' });
      });
    } else {
      return res.json({ success: false, message: 'User not logged in' });
    }
  }
  
module.exports = {islogin,isAuth,logout,isAuth_creat,isAuth_delete}