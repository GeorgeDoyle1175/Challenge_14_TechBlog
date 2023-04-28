const router = require('express').Router();
const blogpostRoutes = require('./blogposts');
const commentRoutes = require('./comments');

router.use('/blogposts', blogpostRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
