const { fromIni } = require('@aws-sdk/credential-providers');
const { aws4Interceptor } = require('aws4-axios');

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
function isStrPresent(str) {
  return str && str !== '' && str !== 'undefined';
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
async function resolveAwsV4Credentials(request) {
  const awsv4 = request.awsv4config;
  if (isStrPresent(awsv4.profileName)) {
    try {
      credentialsProvider = fromIni({
        profile: awsv4.profileName
      });
      credentials = await credentialsProvider();
      awsv4.accessKeyId = credentials.accessKeyId;
      awsv4.secretAccessKey = credentials.secretAccessKey;
      awsv4.sessionToken = credentials.sessionToken;
    } catch {
      console.error('Failed to fetch credentials from AWS profile.');
    }
  }
  return awsv4;
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
function addAwsV4Interceptor(axiosInstance, request) {
  if (!request.awsv4config) {
    console.warn('No Auth Config found!');
    return;
  }

  const awsv4 = request.awsv4config;
  if (!isStrPresent(awsv4.accessKeyId) || !isStrPresent(awsv4.secretAccessKey)) {
    console.warn('Required Auth Fields are not present');
    return;
  }

  const interceptor = aws4Interceptor({
    options: {
      region: awsv4.region,
      service: awsv4.service
    },
    credentials: {
      accessKeyId: awsv4.accessKeyId,
      secretAccessKey: awsv4.secretAccessKey,
      sessionToken: awsv4.sessionToken
    }
  });

  axiosInstance.interceptors.request.use(interceptor);
}

module.exports = {
  addAwsV4Interceptor,
  resolveAwsV4Credentials
};
