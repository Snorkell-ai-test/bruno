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
const TestResults = ({ results, assertionResults }) => {
  results = results || [];
  assertionResults = assertionResults || [];
  if (!results.length && !assertionResults.length) {
    return <div className="px-3">No tests found</div>;
  }

  const passedTests = results.filter((result) => result.status === 'pass');
  const failedTests = results.filter((result) => result.status === 'fail');

  const passedAssertions = assertionResults.filter((result) => result.status === 'pass');
  const failedAssertions = assertionResults.filter((result) => result.status === 'fail');

  return (
    <StyledWrapper className="flex flex-col">
      <div className="pb-2 font-medium test-summary">
        Tests ({results.length}/{results.length}), Passed: {passedTests.length}, Failed: {failedTests.length}
      </div>
      <ul className="">
        {results.map((result) => (
          <li key={result.uid} className="py-1">
            {result.status === 'pass' ? (
              <span className="test-success">&#x2714;&nbsp; {result.description}</span>
            ) : (
              <>
                <span className="test-failure">&#x2718;&nbsp; {result.description}</span>
                <br />
                <span className="error-message pl-8">{result.error}</span>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="py-2 font-medium test-summary">
        Assertions ({assertionResults.length}/{assertionResults.length}), Passed: {passedAssertions.length}, Failed:{' '}
        {failedAssertions.length}
      </div>
      <ul className="">
        {assertionResults.map((result) => (
          <li key={result.uid} className="py-1">
            {result.status === 'pass' ? (
              <span className="test-success">
                &#x2714;&nbsp; {result.lhsExpr}: {result.rhsExpr}
              </span>
            ) : (
              <>
                <span className="test-failure">
                  &#x2718;&nbsp; {result.lhsExpr}: {result.rhsExpr}
                </span>
                <br />
                <span className="error-message pl-8">{result.error}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </StyledWrapper>
  );
};

export default TestResults;
