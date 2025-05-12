/**
 * @module models/Book
 * @description Mongoose model definition for the book collection.
 */

import mongoose, { Schema } from 'mongoose'; // It differs from User here <---
import { IBook } from '../types/IBook';

/**
 * Mongoose schema for the Book model.
 * Defines the structure of documents within the "books" collection.
 */
const BookSchema: Schema = new Schema<IBook>({
  title: { 
    type: String, 
    required: true 
},
  description: 
  { type: String, 
    required: true 
},
  author: {
     type: String, 
     required: true 
    }, 
  genres: {
     type: [String],
      required: true 
    },
  image: {
     type: String, 
     required: true 
    },
  published_year: {
     type: Number, 
     required: true 
    }
});

export default mongoose.model('Book', BookSchema);
