const router = require('express').Router();

// Import the relevant models and middleware
const { BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET all blog posts for the homepage
router.get('/', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'blogpost_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['name'],
          },
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blogposts = blogData.map((blogpost) => blogpost.get({ plain: true }));

    // Render the homepage template with blog post data
    res.render('homepage', {
      blogposts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a single blog post by ID
router.get('/blogpost/:id', async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'blogpost_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['name'],
          },
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    const blogpost = blogData.get({ plain: true });

    // Render the single-post template with blog post data
    res.render('single-post', {
      blogpost,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Use the withAuth middleware to prevent access to routes that require authentication
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find all blog posts belonging to the current user
    const blogData = await BlogPost.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const blogposts = blogData.map((blogpost) => blogpost.get({ plain: true }));

    // Render the dashboard template with blog post data
    res.render('dashboard', {
      blogposts,
      loggedIn: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Render the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // Otherwise, render the login template
  res.render('login');
});

module.exports = router;
