const { get, each } = require('lodash');
const { interpolate } = require('@usebruno/common');
const { getIntrospectionQuery } = require('graphql');
const { setAuthHeaders } = require('./prepare-request');

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
const prepareGqlIntrospectionRequest = (endpoint, envVars, request, collectionRoot) => {
  if (endpoint && endpoint.length) {
    endpoint = interpolate(endpoint, envVars);
  }

  const queryParams = {
    query: getIntrospectionQuery()
  };

  let axiosRequest = {
    method: 'POST',
    url: endpoint,
    headers: {
      ...mapHeaders(request.headers, get(collectionRoot, 'request.headers', [])),
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(queryParams)
  };

  return setAuthHeaders(axiosRequest, request, collectionRoot);
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
const mapHeaders = (requestHeaders, collectionHeaders) => {
  const headers = {};

  each(requestHeaders, (h) => {
    if (h.enabled) {
      headers[h.name] = h.value;
    }
  });

  // collection headers
  each(collectionHeaders, (h) => {
    if (h.enabled) {
      headers[h.name] = h.value;
    }
  });

  return headers;
};

module.exports = prepareGqlIntrospectionRequest;
