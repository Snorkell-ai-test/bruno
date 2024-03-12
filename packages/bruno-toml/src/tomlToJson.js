const Toml = require('@iarna/toml');
const { has, each, get } = require('lodash');

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
const stripNewlineAtEnd = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str.replace(/\n$/, '');
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
const tomlToJson = (toml) => {
  const json = Toml.parse(toml);

  const formattedJson = {
    meta: {
      name: get(json, 'meta.name', ''),
      type: get(json, 'meta.type', ''),
      seq: get(json, 'meta.seq', 0)
    },
    http: {
      method: json.http.method,
      url: json.http.url
    }
  };

  if (json.headers) {
    formattedJson.headers = [];

    // headers are stored in plain json format if they contain duplicate keys
    // the json is stored in a stringified format in the bru key
    if (has(json.headers, 'bru')) {
      let parsedHeaders = JSON.parse(json.headers.bru);

      each(parsedHeaders, (header) => {
        formattedJson.headers.push({
          name: header.name,
          value: header.value,
          enabled: header.enabled
        });
      });
    } else {
      Object.keys(json.headers).forEach((key) => {
        if (key === 'disabled') {
          Object.keys(json.headers['disabled']).forEach((disabledKey) => {
            formattedJson.headers.push({
              name: disabledKey,
              value: json.headers[key][disabledKey],
              enabled: false
            });
          });
          return;
        }

        formattedJson.headers.push({
          name: key,
          value: json.headers[key],
          enabled: true
        });
      });
    }
  }

  if (json.script) {
    if (json.script['pre-request']) {
      formattedJson.script = formattedJson.script || {};
      formattedJson.script.req = stripNewlineAtEnd(json.script['pre-request']);
    }

    if (json.script['post-response']) {
      formattedJson.script = formattedJson.script || {};
      formattedJson.script.res = stripNewlineAtEnd(json.script['post-response']);
    }

    if (json.script['tests']) {
      formattedJson.tests = stripNewlineAtEnd(json.script['tests']);
    }
  }

  return formattedJson;
};

module.exports = tomlToJson;
