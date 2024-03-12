import React from 'react';
import get from 'lodash/get';
import StyledWrapper from './StyledWrapper';
import GrantTypeSelector from './GrantTypeSelector/index';
import OAuth2PasswordCredentials from './PasswordCredentials/index';
import OAuth2AuthorizationCode from './AuthorizationCode/index';
import OAuth2ClientCredentials from './ClientCredentials/index';

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
const grantTypeComponentMap = (grantType, item, collection) => {
  switch (grantType) {
    case 'password':
      return <OAuth2PasswordCredentials item={item} collection={collection} />;
      break;
    case 'authorization_code':
      return <OAuth2AuthorizationCode item={item} collection={collection} />;
      break;
    case 'client_credentials':
      return <OAuth2ClientCredentials item={item} collection={collection} />;
      break;
    default:
      return <div>TBD</div>;
      break;
  }
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
const OAuth2 = ({ item, collection }) => {
  const oAuth = item.draft ? get(item, 'draft.request.auth.oauth2', {}) : get(item, 'request.auth.oauth2', {});

  return (
    <StyledWrapper className="mt-2 w-full">
      <GrantTypeSelector item={item} collection={collection} />
      {grantTypeComponentMap(oAuth?.grantType, item, collection)}
    </StyledWrapper>
  );
};

export default OAuth2;
