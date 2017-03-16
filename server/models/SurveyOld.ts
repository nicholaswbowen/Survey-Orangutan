import {Schema} from 'mongoose';
import {model} from 'mongoose';

let survey = new Schema({
  title: String,
  owner: String,
  participants: [{
    info: {age: Number, sex: String, race: String},
    answers: [Number]
  }],
  responses: [String],
  questions: [String]
})
export const Survey = model('Survey', survey);
