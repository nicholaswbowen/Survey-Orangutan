import * as express from 'express';
import * as passport from 'passport';
import {guard} from '../lib/guard';
import {Survey} from '../models/Survey';
let router = express.Router();

router.get('/survey/:surveyId',
passport.authenticate('jwt'),
guard(['survey:write']),
(req,res,next) => {
  Survey.findById({_id: req.params.surveyId, owner: req.user.username})
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      res.json({message: 'get failed', error: e});
    })
})

router.post('/survey',
passport.authenticate('jwt'),
guard(['survey:write']),
(req,res,next) => {
  Survey.create(req.body)
    .then((result) => {
      return res.json({message: `new survey added with id:${result['_id']}`});
    })
    .catch((e) => {
      return res.json({message: `survey not added`});
    });
});

router.put('/survey/:surveyId',
passport.authenticate('jwt'),
guard(['survey:write']),
(req,res,next) => {
  console.log(req.body);
  Survey.findOneAndUpdate({_id: req.params.surveyId, owner: req.user.username},
  {$push: {participants: req.body}})
    .then((result) => {
      return res.json({message: `Succesfully added participant to survey: ${req.body['_id']}` });
    })
    .catch((e) => {
      return res.json({message: `Unable to add participant to survey: ${req.body['_id']}`, error: e });
    })
})

export = router;
