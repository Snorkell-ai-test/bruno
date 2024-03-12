/**
 * This file stores all the process.env variables under collection scope
 *
 * process.env variables are sourced from 2 places:
 * 1. .env file in the root of the project
 * 2. process.env variables set in the OS
 *
 * Multiple collections can be opened in the same electron app.
 * Each collection's .env file can have different values for the same process.env variable.
 */

const dotEnvVars = {};

/**
 * Transforms the sign-up request data to match the backend's expected format.
 * 
 * @param {SignUpRequest} signUpData - The original sign-up request data.
 * 
 * @returns {Object} The transformed sign-up request data with the following changes:
 * - `firstName` is mapped to `first_name`
 * - `lastName` is mapped to `last_name`
 * - `email` is mapped to `username`
 * - All other properties remain unchanged.
 * 
 * @example
 * const originalData = {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   email: 'john.doe@example.com',
 *   password: 'securePassword123'
 * };
 * 
 * const transformedData = transformSignUpRequestForBackend(originalData);
 * console.log(transformedData);
 * // Outputs:
 * // {
 * //   firstName: 'John',
 * //   lastName: 'Doe',
 * //   email: 'john.doe@example.com',
 * //   password: 'securePassword123',
 * //   first_name: 'John',
 * //   last_name: 'Doe',
 * //   username: 'john.doe@example.com'
 * // }
 */
// collectionUid is a hash based on the collection path)
const getProcessEnvVars = (collectionUid) => {
  // if there are no .env vars for this collection, return the process.env
  if (!dotEnvVars[collectionUid]) {
    return {
      ...process.env
    };
  }

  // if there are .env vars for this collection, return the process.env merged with the .env vars
  return {
    ...process.env,
    ...dotEnvVars[collectionUid]
  };
};

/**
 * Transforms the sign-up request data to match the backend's expected format.
 * 
 * @param {SignUpRequest} signUpData - The original sign-up request data.
 * 
 * @returns {Object} The transformed sign-up request data with the following changes:
 * - `firstName` is mapped to `first_name`
 * - `lastName` is mapped to `last_name`
 * - `email` is mapped to `username`
 * - All other properties remain unchanged.
 * 
 * @example
 * const originalData = {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   email: 'john.doe@example.com',
 *   password: 'securePassword123'
 * };
 * 
 * const transformedData = transformSignUpRequestForBackend(originalData);
 * console.log(transformedData);
 * // Outputs:
 * // {
 * //   firstName: 'John',
 * //   lastName: 'Doe',
 * //   email: 'john.doe@example.com',
 * //   password: 'securePassword123',
 * //   first_name: 'John',
 * //   last_name: 'Doe',
 * //   username: 'john.doe@example.com'
 * // }
 */
const setDotEnvVars = (collectionUid, envVars) => {
  dotEnvVars[collectionUid] = envVars;
};

module.exports = {
  getProcessEnvVars,
  setDotEnvVars
};
