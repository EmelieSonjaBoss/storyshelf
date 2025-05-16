/**
 * @module types/ILogedinUser
 * @description TypeScript interface representing a user object after successful authentication.
 * Used for type-checking authenticated user data sent from the backend.
 */

/**
 * Represents a user that has successfully logged in.
 */
export interface ILogedinUser {
  username: string;
  is_admin: boolean;
}
