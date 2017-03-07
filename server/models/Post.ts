import * as mongoose from 'mongoose';

export interface IPost extends mongoose.Document {
  comment: string;
  image: string;
  owner: string;
  date: Date;
}

let PostSchema = new mongoose.Schema({
  comment: { type: String, max: 160, min: 0},
  image: {type: String, required: true},
  owner: {type: String},
  date: Date
});

export const Post = mongoose.model<IPost>('Post', PostSchema);
