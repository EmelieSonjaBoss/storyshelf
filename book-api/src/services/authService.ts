/**
 * @module services/authService
 * @description Provides utility functions for authentication, including password verification.
 */

import bcrypt from "bcryptjs";

/**
 * Compares a given password with the hashed password in the database.
 * 
 * This function uses bcrypt to compare the plain-text password entered by the user 
 * with the hashed password stored in the database.
 * 
 * @param {string} enteredPassword - The plain-text password entered by the user.
 * @param {string} storedPasswordHash - The hashed password stored in the database.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the passwords match.
 */
export const verifyPassword = async (
  enteredPassword: string, 
  storedPasswordHash: string
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(enteredPassword, storedPasswordHash);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};
