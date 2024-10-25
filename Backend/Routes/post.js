const express = require('express');
const router = express.Router();
const path = require('path');
const { get_all_post, create_Poste, update_Poste, delete_post, find_by_title,get_user_posts } = require('../Controllers/Post');
const { isAuth, isAuth_creat,isAuth_delete } = require('../middle_ware/islogin');
const formidableMiddleware = require('express-formidable');

const storage = {
//   destination: './BookImage',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
};

// router.use(isAuth);

router.get('/get_all', get_all_post);
router.post('/create', formidableMiddleware({ uploadDir: './BookImage', keepExtensions: true }), isAuth_creat, create_Poste);
router.post('/isAuth',isAuth_delete);
router.put('/update/:id', update_Poste);
router.delete('/delete/:id',isAuth_delete,delete_post);
router.get('/getTitle/:Title', find_by_title);
router.get('/userpost/:email',get_user_posts)

module.exports = router;
