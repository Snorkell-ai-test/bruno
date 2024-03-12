import React from 'react';

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
const TestResultsLabel = ({ results, assertionResults }) => {
  results = results || [];
  assertionResults = assertionResults || [];
  if (!results.length && !assertionResults.length) {
    return 'Tests';
  }

  const numberOfTests = results.length;
  const numberOfFailedTests = results.filter((result) => result.status === 'fail').length;

  const numberOfAssertions = assertionResults.length;
  const numberOfFailedAssertions = assertionResults.filter((result) => result.status === 'fail').length;

  const totalNumberOfTests = numberOfTests + numberOfAssertions;
  const totalNumberOfFailedTests = numberOfFailedTests + numberOfFailedAssertions;

  return (
    <div className="flex items-center">
      <div>Tests</div>
      {totalNumberOfFailedTests ? (
        <sup className="sups some-tests-failed ml-1 font-medium">{totalNumberOfFailedTests}</sup>
      ) : (
        <sup className="sups all-tests-passed ml-1 font-medium">{totalNumberOfTests}</sup>
      )}
    </div>
  );
};

export default TestResultsLabel;
