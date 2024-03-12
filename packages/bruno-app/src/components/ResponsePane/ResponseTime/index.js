import React from 'react';
import StyledWrapper from './StyledWrapper';

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
const ResponseTime = ({ duration }) => {
  let durationToDisplay = '';

  if (duration > 1000) {
    // duration greater than a second
    let seconds = Math.floor(duration / 1000);
    let decimal = ((duration % 1000) / 1000) * 100;
    durationToDisplay = seconds + '.' + decimal.toFixed(0) + 's';
  } else {
    durationToDisplay = duration + 'ms';
  }

  return <StyledWrapper className="ml-4">{durationToDisplay}</StyledWrapper>;
};
export default ResponseTime;
