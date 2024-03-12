import React from 'react';
import forOwn from 'lodash/forOwn';
import { safeStringifyJSON } from 'utils/common';
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
const Timeline = ({ request, response }) => {
  const requestHeaders = [];
  const responseHeaders = typeof response.headers === 'object' ? Object.entries(response.headers) : [];

  request = request || {};
  response = response || {};

  forOwn(request.headers, (value, key) => {
    requestHeaders.push({
      name: key,
      value
    });
  });

  let requestData = safeStringifyJSON(request.data);

  return (
    <StyledWrapper className="pb-4 w-full">
      <div>
        <pre className="line request font-bold">
          <span className="arrow">{'>'}</span> {request.method} {request.url}
        </pre>
        {requestHeaders.map((h) => {
          return (
            <pre className="line request" key={h.name}>
              <span className="arrow">{'>'}</span> {h.name}: {h.value}
            </pre>
          );
        })}

        {requestData ? (
          <pre className="line request">
            <span className="arrow">{'>'}</span> data {requestData}
          </pre>
        ) : null}
      </div>

      <div className="mt-4">
        <pre className="line response font-bold">
          <span className="arrow">{'<'}</span> {response.status} {response.statusText}
        </pre>

        {responseHeaders.map((h) => {
          return (
            <pre className="line response" key={h[0]}>
              <span className="arrow">{'<'}</span> {h[0]}: {h[1]}
            </pre>
          );
        })}
      </div>
    </StyledWrapper>
  );
};

export default Timeline;
