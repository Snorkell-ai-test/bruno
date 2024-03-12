import get from 'lodash/get';

let CodeMirror;
const SERVER_RENDERED = typeof navigator === 'undefined' || global['PREVENT_CODEMIRROR_RENDER'] === true;

if (!SERVER_RENDERED) {
  CodeMirror = require('codemirror');
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
const pathFoundInVariables = (path, obj) => {
  const value = get(obj, path);
  return value !== undefined;
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
export const defineCodeMirrorBrunoVariablesMode = (variables, mode) => {
  CodeMirror.defineMode('brunovariables', function (config, parserConfig) {
    let variablesOverlay = {
      token: function (stream, state) {
        if (stream.match('{{', true)) {
          let ch;
          let word = '';
          while ((ch = stream.next()) != null) {
            if (ch == '}' && stream.next() == '}') {
              stream.eat('}');
              let found = pathFoundInVariables(word, variables);
              if (found) {
                return 'variable-valid random-' + (Math.random() + 1).toString(36).substring(9);
              } else {
                return 'variable-invalid random-' + (Math.random() + 1).toString(36).substring(9);
              }
              // Random classname added so adjacent variables are not rendered in the same SPAN by CodeMirror.
            }
            word += ch;
          }
        }
        while (stream.next() != null && !stream.match('{{', false)) {}
        return null;
      }
    };

    return CodeMirror.overlayMode(CodeMirror.getMode(config, parserConfig.backdrop || mode), variablesOverlay);
  });
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
export const getCodeMirrorModeBasedOnContentType = (contentType, body) => {
  if (typeof body === 'object') {
    return 'application/ld+json';
  }
  if (!contentType || typeof contentType !== 'string') {
    return 'application/text';
  }

  if (contentType.includes('json')) {
    return 'application/ld+json';
  } else if (contentType.includes('xml')) {
    return 'application/xml';
  } else if (contentType.includes('html')) {
    return 'application/html';
  } else if (contentType.includes('text')) {
    return 'application/text';
  } else if (contentType.includes('application/edn')) {
    return 'application/xml';
  } else if (contentType.includes('yaml')) {
    return 'application/yaml';
  } else if (contentType.includes('image')) {
    return 'application/image';
  } else {
    return 'application/text';
  }
};
