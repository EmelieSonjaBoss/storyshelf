/**
 * @module types/IAuthCredentials
 * @description TypeScript interfaces defining the shape of login and registration credential objects.
 * Used for type-checking authentication-related data.
 */

/**
 * Represents user login credentials.
 */
export interface ILoginCredentials {
  username: string;
  password: string;
}

/**
 * Represents user registration credentials, extending login credentials with admin flag.
 */
export interface IRegisterCredentials extends ILoginCredentials {
  is_admin: boolean;
}
