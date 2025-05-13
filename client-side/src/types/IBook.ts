/**
 * @module types/IBook
 * @description TypeScript interface defining the shape of a Book object.
 * Used for type-checking Book data.
 */

/**
 * Represents a book entry.
 */
export interface IBook {
    title: string;
    description: string;
    author: string;
    genres: string[];
    image: string;
    published_year: number;
    _id: string;
  }
