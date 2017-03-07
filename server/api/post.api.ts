import * as express from 'express';
import * as passport from 'passport';
import {Post} from './../models/Post';
let guard = require('express-jwt-permissions')();
let router = express.Router();

router.get('/post',
  passport.authenticate('jwt', {}),
  guard.check(['post:delete']),
  (req, res, next) => {
    Post.find()
      .sort({date: -1})
      .then((result) => {
        return res.json(result);
      }).catch((e) => {
        return next({message: 'unable to retrieve posts', error: e});
      });
    });

router.post('/post',
passport.authenticate('jwt', {}),
guard.check(['post:write']),
(req, res, next) => {
  req.body.owner = req.user.username;
  Post.create(req.body)
    .then((result) => {
      return res.json(result);
    }).catch((e) => {
      return next({message: 'Unable to create post.', error: e });
    });
});

export = router;
