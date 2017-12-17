const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const TravelPost = require('../models/user-model');

router.get('/contact/new', ensureLoggedIn(), (req, res) => {
    res.render('contact/newpost');
});

router.post('/contact/new', ensureLoggedIn(), (req, res) => {

    const contact = new User ({
      _creator: req.user._id,
      clientSchema.title: req.body.title,
      clientSchema.description: req.body.description,
    })
    post.save((err, newpost) => {
      if (err) {
        res.render('post/newpost', { TravelPost: newpost, types: TYPES });
      } else {
        res.redirect('/');
      }
    });
});

// routes to Edit post
router.get('/:id/edit', ensureLoggedIn('/login'),  (req, res, next) => {
  TravelPost.findById(req.params.id, (err, post) => {
    if (err)       { return next(err) }
    if (!post) { return next(new Error("404")) }
    return res.render('post/edit', { post, types: TYPES })
  });
});


// Find and Update record
router.post('/:id/edit', ensureLoggedIn('/login'), (req, res, next) => {
  const updates = {
    title: req.body.title,
    description: req.body.description,
  };

  TravelPost.findByIdAndUpdate(req.params.id, updates, (err, post) => {
    if (err) {
      return res.render('post/edit', {
        post,
        errors: post.errors
      });
    }
    if (!post) {
      return next(new Error('404'));
    }
    return res.redirect(`/`);
  });
});
router.post('/:id/delete', (req, res, next) => {
  TravelPost.findByIdAndRemove(req.params.id, (err, post) => {
    if (err) {
      return next(err);
    }
    return res.redirect('/');
  })
})

module.exports = router;
