const axios = require('axios');

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
function makeAxiosInstance() {
  /** @type {axios.AxiosInstance} */
  const instance = axios.create();

  instance.interceptors.request.use((config) => {
    config.headers['request-start-time'] = Date.now();
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      const end = Date.now();
      const start = response.config.headers['request-start-time'];
      response.headers['request-duration'] = end - start;
      return response;
    },
    (error) => {
      if (error.response) {
        const end = Date.now();
        const start = error.config.headers['request-start-time'];
        error.response.headers['request-duration'] = end - start;
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

module.exports = {
  makeAxiosInstance
};
