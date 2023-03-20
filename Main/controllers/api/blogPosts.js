const { Blogpost, User, Comment } = require('../models');

const blogpostController = {
  // get all blogposts
  getAllBlogposts: async (req, res) => {
    try {
      const blogposts = await Blogpost.findAll({
        include: [
          { model: User, attributes: ['name'] },
          { model: Comment, include: [{ model: User, attributes: ['name'] }] },
        ],
      });
      res.status(200).json(blogposts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // get a single blogpost by id
  getBlogpostById: async (req, res) => {
    try {
      const blogpost = await Blogpost.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ['name'] },
          { model: Comment, include: [{ model: User, attributes: ['name'] }] },
        ],
      });
      if (!blogpost) {
        res.status(404).json({ message: 'No blogpost found with this id!' });
      } else {
        res.status(200).json(blogpost);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // create a new blogpost
  createBlogpost: async (req, res) => {
    try {
      const blogpostData = await Blogpost.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id, // get the user_id from the session
      });
      res.status(200).json(blogpostData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // update a blogpost
  updateBlogpost: async (req, res) => {
    try {
      const updatedBlogpost = await Blogpost.update(
        {
          title: req.body.title,
          content: req.body.content,
        },
        {
          where: {
            id: req.params.id,
            user_id: req.session.user_id, // make sure the user owns the blogpost
          },
        }
      );
      if (!updatedBlogpost[0]) {
        res.status(404).json({ message: 'No blogpost found with this id!' });
      } else {
        res.status(200).json({ message: 'Blogpost updated successfully!' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // delete a blogpost
  deleteBlogpost: async (req, res) => {
    try {
      const deletedBlogpost = await Blogpost.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id, // make sure the user owns the blogpost
        },
      });
      if (!deletedBlogpost) {
        res.status(404).json({ message: 'No blogpost found with this id!' });
      } else {
        res.status(200).json({ message: 'Blogpost deleted successfully!' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = blogpostController;
