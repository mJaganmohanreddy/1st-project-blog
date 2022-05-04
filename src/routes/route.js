const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController')
const blogController = require('../controllers/blogController')
const middleware = require('../middleware/middleware')


router.post('/authors', authorController.createAuthor);

router.post('/login', authorController.loginAuthor);

router.post('/blogs',middleware.authentication,middleware.autherization, blogController.createBlog);

router.get('/filterblogs', middleware.authentication, blogController.getBlog);

 router.delete('/blogs/:blogId',middleware.authentication,middleware.autherization,  blogController.deleteBlogById );

 router.put('/blogs/:blogId',middleware.authentication,middleware.autherization, blogController.updateDetails)

 router.delete('/blogs',middleware.authentication,middleware.autherization, blogController.deleteBlogById)

 

module.exports=router;