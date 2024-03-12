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
const Test = (__brunoTestResults, chai) => async (description, callback) => {
  try {
    await callback();
    __brunoTestResults.addResult({ description, status: 'pass' });
  } catch (error) {
    console.log(chai.AssertionError);
    if (error instanceof chai.AssertionError) {
      const { message, actual, expected } = error;
      __brunoTestResults.addResult({
        description,
        status: 'fail',
        error: message,
        actual,
        expected
      });
    } else {
      __brunoTestResults.addResult({
        description,
        status: 'fail',
        error: error.message || 'An unexpected error occurred.'
      });
    }
    console.log(error);
  }
};

module.exports = Test;
