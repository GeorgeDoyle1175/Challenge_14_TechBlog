const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all comments
router.get('/', async (req, res) => {
  try {
    const commentsData = await Comment.findAll();
    res.status(200).json(commentsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single comment by ID
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id, // automatically set user_id to the current user's ID
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a comment by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // make sure the user is authorized to update this comment
      },
    });
    if (!commentData[0]) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Comment updated successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a comment by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // make sure the user is authorized to delete this comment
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Comment deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
