/**
 * @module types/IUser
 * @description TypeScript interface defining the shape of a User object.
 * Used for type-checking User data.
 */

/**
 * Represents a user entry.
 */

export interface IUser {
  _id: string;
  username: string;
  password: string;
  is_admin: boolean;
  created_at: string;
}
