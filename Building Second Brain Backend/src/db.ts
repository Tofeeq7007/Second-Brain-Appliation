import mongoose from "mongoose";
import { string } from "zod";
import { MONGODB_URL } from "./config.js";

// Add connection error handling
mongoose.connect(MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
enum Tag_type {
    Facebook = 'Facebook',
    Twitter = 'twitter',
    Youtube = 'youtube',
}
const {Schema} = mongoose;
const UserSchema = new Schema({
    name:{type:String , unique:true},
    password:String
})


// Tag Schema
const TagsSchema = new Schema({
    tag:String,
})

// Content Schema
const ContentSchema = new Schema({
    title:String,
    description:String,
    image:String,
    link:String,
    type:String,
    tags: {type:Schema.Types.ObjectId, ref:'Tags'},
    userId:{type:Schema.Types.ObjectId, ref:'User',required:true},
    
});

// Link Schema
const LinkSchema = new Schema({
    hash:String,
    userId:{type:Schema.Types.ObjectId, ref:'User'
        ,required:true, unique:true
    }
})

export const UserModel = mongoose.model('User',UserSchema);
export const ContentModel = mongoose.model("Content",ContentSchema);
export const TagsModel = mongoose.model("Tags",TagsSchema);
export const LinkModel = mongoose.model("Links",LinkSchema);