import { forOwn } from 'lodash';
import { convertToCodeMirrorJson } from 'utils/common';
import curlToJson from './curl-to-json';

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
export const getRequestFromCurlCommand = (curlCommand) => {
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
  const parseFormData = (parsedBody) => {
    const formData = [];
    forOwn(parsedBody, (value, key) => {
      formData.push({ name: key, value, enabled: true });
    });

    return formData;
  };

  try {
    if (!curlCommand || typeof curlCommand !== 'string' || curlCommand.length === 0) {
      return null;
    }

    const request = curlToJson(curlCommand);
    const parsedHeaders = request?.headers;
    const headers =
      parsedHeaders &&
      Object.keys(parsedHeaders).map((key) => ({ name: key, value: parsedHeaders[key], enabled: true }));

    const contentType = headers?.find((h) => h.name.toLowerCase() === 'content-type')?.value;
    const body = {
      mode: 'none',
      json: null,
      text: null,
      xml: null,
      sparql: null,
      multipartForm: null,
      formUrlEncoded: null
    };
    const parsedBody = request.data;
    if (parsedBody && contentType && typeof contentType === 'string') {
      if (contentType.includes('application/json')) {
        body.mode = 'json';
        body.json = convertToCodeMirrorJson(parsedBody);
      } else if (contentType.includes('text/xml')) {
        body.mode = 'xml';
        body.xml = parsedBody;
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        body.mode = 'formUrlEncoded';
        body.formUrlEncoded = parseFormData(parsedBody);
      } else if (contentType.includes('multipart/form-data')) {
        body.mode = 'multipartForm';
        body.multipartForm = parsedBody;
      } else if (contentType.includes('text/plain')) {
        body.mode = 'text';
        body.text = parsedBody;
      }
    }
    return {
      url: request.url,
      method: request.method,
      body,
      headers: headers
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
