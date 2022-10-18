const express = require('express')
const router = express.Router()

const PostsController = require('../controllers/PostsController');
const { verifyToken } = require('../middleware/auth');

//product routes
router.get('/',verifyToken ,PostsController.index)
router.get('/show/:id',verifyToken, PostsController.show)
router.post('/create',verifyToken, PostsController.create)
router.put('/update/:id',verifyToken, PostsController.update)
router.delete('/delete/:id',verifyToken, PostsController.destroy)
router.post('/get-active-deactive-posts-count',verifyToken, PostsController.getActiveAndDeactivePostsCount)


module.exports = router