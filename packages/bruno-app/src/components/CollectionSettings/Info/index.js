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
function countRequests(items) {
  let count = 0;

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
  function recurse(item) {
    if (item && typeof item === 'object') {
      if (item.type !== 'folder') {
        count++;
      }
      if (Array.isArray(item.items)) {
        item.items.forEach(recurse);
      }
    }
  }

  items.forEach(recurse);

  return count;
}

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
const Info = ({ collection }) => {
  return (
    <StyledWrapper className="w-full flex flex-col h-full">
      <table className="w-full border-collapse">
        <tbody>
          <tr className="">
            <td className="py-2 px-2 text-right">Name&nbsp;:</td>
            <td className="py-2 px-2">{collection.name}</td>
          </tr>
          <tr className="">
            <td className="py-2 px-2 text-right">Location&nbsp;:</td>
            <td className="py-2 px-2 break-all">{collection.pathname}</td>
          </tr>
          <tr className="">
            <td className="py-2 px-2 text-right">Ignored files&nbsp;:</td>
            <td className="py-2 px-2 break-all">{collection.brunoConfig.ignore.map((x) => `'${x}'`).join(', ')}</td>
          </tr>
          <tr className="">
            <td className="py-2 px-2 text-right">Environments&nbsp;:</td>
            <td className="py-2 px-2">{collection.environments?.length || 0}</td>
          </tr>
          <tr className="">
            <td className="py-2 px-2 text-right">Requests&nbsp;:</td>
            <td className="py-2 px-2">{countRequests(collection.items)}</td>
          </tr>
        </tbody>
      </table>
    </StyledWrapper>
  );
};

export default Info;
