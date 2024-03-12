import React from 'react';
import path from 'path';
import { useDispatch } from 'react-redux';
import { browseFiles } from 'providers/ReduxStore/slices/collections/actions';
import { IconX } from '@tabler/icons';
import { isWindowsOS } from 'utils/common/platform';
import slash from 'utils/common/slash';

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
const FilePickerEditor = ({ value, onChange, collection }) => {
  value = value || [];
  const dispatch = useDispatch();
  const filenames = value
    .filter((v) => v != null && v != '')
    .map((v) => {
      const separator = isWindowsOS() ? '\\' : '/';
      return v.split(separator).pop();
    });

  // title is shown when hovering over the button
  const title = filenames.map((v) => `- ${v}`).join('\n');

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
  const browse = () => {
    dispatch(browseFiles())
      .then((filePaths) => {
        // If file is in the collection's directory, then we use relative path
        // Otherwise, we use the absolute path
        filePaths = filePaths.map((filePath) => {
          const collectionDir = collection.pathname;

          if (filePath.startsWith(collectionDir)) {
            return path.relative(slash(collectionDir), slash(filePath));
          }

          return filePath;
        });

        onChange(filePaths);
      })
      .catch((error) => {
        console.error(error);
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
  const clear = () => {
    onChange('');
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
  const renderButtonText = (filenames) => {
    if (filenames.length == 1) {
      return filenames[0];
    }
    return filenames.length + ' files selected';
  };

  return filenames.length > 0 ? (
    <div
      className="btn btn-secondary px-1"
      style={{ fontWeight: 400, width: '100%', textOverflow: 'ellipsis', overflowX: 'hidden' }}
      title={title}
    >
      <button className="align-middle" onClick={clear}>
        <IconX size={18} />
      </button>
      &nbsp;
      {renderButtonText(filenames)}
    </div>
  ) : (
    <button className="btn btn-secondary px-1" style={{ width: '100%' }} onClick={browse}>
      Select Files
    </button>
  );
};

export default FilePickerEditor;
