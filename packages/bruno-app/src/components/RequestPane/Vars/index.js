import React from 'react';
import get from 'lodash/get';
import VarsTable from './VarsTable';
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
const Vars = ({ item, collection }) => {
  const requestVars = item.draft ? get(item, 'draft.request.vars.req') : get(item, 'request.vars.req');
  const responseVars = item.draft ? get(item, 'draft.request.vars.res') : get(item, 'request.vars.res');

  return (
    <StyledWrapper className="w-full flex flex-col">
      <div className="flex-1 mt-2">
        <div className="mb-1 title text-xs">Pre Request</div>
        <VarsTable item={item} collection={collection} vars={requestVars} varType="request" />
      </div>
      <div className="flex-1">
        <div className="mt-1 mb-1 title text-xs">Post Response</div>
        <VarsTable item={item} collection={collection} vars={responseVars} varType="response" />
      </div>
    </StyledWrapper>
  );
};

export default Vars;
