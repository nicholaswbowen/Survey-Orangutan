import * as express from 'express';
import * as passport from 'passport';
import {guard} from '../lib/guard';
import {Survey} from '../models/Survey';
let router = express.Router();


router.get('/survey/:surveyId',
// passport.authenticate('jwt'),
// guard(['survey:write']),
(req,res,next) => {

  // let stream = Survey.find({_id: req.params.surveyId}).stream();
  //
  // stream.on('data', (chunk) => {
  //   res.write(chunk);
  // })
  Survey.findById({_id: req.params.surveyId})
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      res.json({message: 'get failed', error: e});
    })
})

// router.get('/survey/:surveyId', (req, res, next) => {
//   res.set('Content-Type', 'application/json');
//   res.write('[');
//   var prevChunk = null;
//   Survey.find({_id: req.params.surveyId}).cursor()
//     .on('data', function onData(data) {
//       if (prevChunk) {
//         res.write(JSON.stringify(prevChunk) + ',');
//       }
//       prevChunk = data;
//     })
//     .on('end', function onEnd() {
//       if (prevChunk) {
//         res.write(JSON.stringify(prevChunk));
//       }
//       res.end(']');
//     });
// });


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
