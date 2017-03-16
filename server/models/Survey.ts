import {Schema} from 'mongoose';
import {model} from 'mongoose';

let survey = new Schema({
  participants: [{
    info: [Number],
    answers: [Number]
  }],
})
export const Survey = model('Survey', survey);
