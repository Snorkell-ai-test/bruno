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
const ResponseSize = ({ size }) => {
  let sizeToDisplay = '';

  if (size > 1024) {
    // size is greater than 1kb
    let kb = Math.floor(size / 1024);
    let decimal = Math.round(((size % 1024) / 1024).toFixed(2) * 100);
    sizeToDisplay = kb + '.' + decimal + 'KB';
  } else {
    sizeToDisplay = size + 'B';
  }

  return (
    <StyledWrapper title={size.toLocaleString() + 'B'} className="ml-4">
      {sizeToDisplay}
    </StyledWrapper>
  );
};
export default ResponseSize;
