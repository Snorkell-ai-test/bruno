const stringify = require('../lib/stringify');
const { get, each, filter } = require('lodash');

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
const keyValPairHasDuplicateKeys = (keyValPair) => {
  if (!keyValPair || !Array.isArray(keyValPair) || !keyValPair.length) {
    return false;
  }

  const names = keyValPair.map((pair) => pair.name);
  const uniqueNames = new Set(names);

  return names.length !== uniqueNames.size;
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
// these keys are reserved: disabled, description, enum
const keyValPairHasReservedKeys = (keyValPair) => {
  if (!keyValPair || !Array.isArray(keyValPair) || !keyValPair.length) {
    return false;
  }

  const reservedKeys = ['disabled', 'description', 'enum', 'bru'];
  const names = keyValPair.map((pair) => pair.name);

  return names.some((name) => reservedKeys.includes(name));
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
const jsonToToml = (json) => {
  const formattedJson = {
    meta: {
      name: get(json, 'meta.name'),
      type: get(json, 'meta.type'),
      seq: get(json, 'meta.seq')
    },
    http: {
      method: get(json, 'http.method'),
      url: get(json, 'http.url', '')
    }
  };

  if (json.headers && json.headers.length) {
    const hasDuplicateHeaders = keyValPairHasDuplicateKeys(json.headers);
    const hasReservedHeaders = keyValPairHasReservedKeys(json.headers);

    if (!hasDuplicateHeaders && !hasReservedHeaders) {
      const enabledHeaders = filter(json.headers, (header) => header.enabled);
      const disabledHeaders = filter(json.headers, (header) => !header.enabled);
      each(enabledHeaders, (header) => {
        formattedJson.headers = formattedJson.headers || {};
        formattedJson.headers[header.name] = header.value;
      });
      each(disabledHeaders, (header) => {
        formattedJson.headers = formattedJson.headers || {};
        formattedJson.headers.disabled = formattedJson.headers.disabled || {};
        formattedJson.headers.disabled[header.name] = header.value;
      });
    } else {
      formattedJson.headers = {
        bru: JSON.stringify(json.headers, null, 2) + '\n'
      };
    }
  }

  if (json.script) {
    let preRequestScript = get(json, 'script.req', '');
    if (preRequestScript.trim().length > 0) {
      formattedJson.script = formattedJson.script || {};
      formattedJson.script['pre-request'] = preRequestScript + '\n';
    }

    let postResponseScript = get(json, 'script.res', '');
    if (postResponseScript.trim().length > 0) {
      formattedJson.script = formattedJson.script || {};
      formattedJson.script['post-response'] = postResponseScript + '\n';
    }
  }

  if (json.tests) {
    let testsScript = get(json, 'tests', '');
    if (testsScript.trim().length > 0) {
      formattedJson.script = formattedJson.script || {};
      formattedJson.script['tests'] = testsScript + '\n';
    }
  }

  return stringify(formattedJson);
};

module.exports = jsonToToml;
