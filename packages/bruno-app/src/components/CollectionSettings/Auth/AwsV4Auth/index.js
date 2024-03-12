import React from 'react';
import get from 'lodash/get';
import { useTheme } from 'providers/Theme';
import { useDispatch } from 'react-redux';
import SingleLineEditor from 'components/SingleLineEditor';
import { updateCollectionAuth } from 'providers/ReduxStore/slices/collections';
import { saveCollectionRoot } from 'providers/ReduxStore/slices/collections/actions';
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
const AwsV4Auth = ({ collection }) => {
  const dispatch = useDispatch();
  const { storedTheme } = useTheme();

  const awsv4Auth = get(collection, 'root.request.auth.awsv4', {});

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
  const handleSave = () => dispatch(saveCollectionRoot(collection.uid));

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
  const handleAccessKeyIdChange = (accessKeyId) => {
    dispatch(
      updateCollectionAuth({
        mode: 'awsv4',
        collectionUid: collection.uid,
        content: {
          accessKeyId: accessKeyId,
          secretAccessKey: awsv4Auth.secretAccessKey,
          sessionToken: awsv4Auth.sessionToken,
          service: awsv4Auth.service,
          region: awsv4Auth.region,
          profileName: awsv4Auth.profileName
        }
      })
    );
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
  const handleSecretAccessKeyChange = (secretAccessKey) => {
    dispatch(
      updateCollectionAuth({
        mode: 'awsv4',
        collectionUid: collection.uid,
        content: {
          accessKeyId: awsv4Auth.accessKeyId,
          secretAccessKey: secretAccessKey,
          sessionToken: awsv4Auth.sessionToken,
          service: awsv4Auth.service,
          region: awsv4Auth.region,
          profileName: awsv4Auth.profileName
        }
      })
    );
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
  const handleSessionTokenChange = (sessionToken) => {
    dispatch(
      updateCollectionAuth({
        mode: 'awsv4',
        collectionUid: collection.uid,
        content: {
          accessKeyId: awsv4Auth.accessKeyId,
          secretAccessKey: awsv4Auth.secretAccessKey,
          sessionToken: sessionToken,
          service: awsv4Auth.service,
          region: awsv4Auth.region,
          profileName: awsv4Auth.profileName
        }
      })
    );
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
  const handleServiceChange = (service) => {
    dispatch(
      updateCollectionAuth({
        mode: 'awsv4',
        collectionUid: collection.uid,
        content: {
          accessKeyId: awsv4Auth.accessKeyId,
          secretAccessKey: awsv4Auth.secretAccessKey,
          sessionToken: awsv4Auth.sessionToken,
          service: service,
          region: awsv4Auth.region,
          profileName: awsv4Auth.profileName
        }
      })
    );
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
  const handleRegionChange = (region) => {
    dispatch(
      updateCollectionAuth({
        mode: 'awsv4',
        collectionUid: collection.uid,
        content: {
          accessKeyId: awsv4Auth.accessKeyId,
          secretAccessKey: awsv4Auth.secretAccessKey,
          sessionToken: awsv4Auth.sessionToken,
          service: awsv4Auth.service,
          region: region,
          profileName: awsv4Auth.profileName
        }
      })
    );
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
  const handleProfileNameChange = (profileName) => {
    dispatch(
      updateCollectionAuth({
        mode: 'awsv4',
        collectionUid: collection.uid,
        content: {
          accessKeyId: awsv4Auth.accessKeyId,
          secretAccessKey: awsv4Auth.secretAccessKey,
          sessionToken: awsv4Auth.sessionToken,
          service: awsv4Auth.service,
          region: awsv4Auth.region,
          profileName: profileName
        }
      })
    );
  };

  return (
    <StyledWrapper className="mt-2 w-full">
      <label className="block font-medium mb-2">Access Key ID</label>
      <div className="single-line-editor-wrapper mb-2">
        <SingleLineEditor
          value={awsv4Auth.accessKeyId || ''}
          theme={storedTheme}
          onSave={handleSave}
          onChange={(val) => handleAccessKeyIdChange(val)}
          collection={collection}
        />
      </div>

      <label className="block font-medium mb-2">Secret Access Key</label>
      <div className="single-line-editor-wrapper mb-2">
        <SingleLineEditor
          value={awsv4Auth.secretAccessKey || ''}
          theme={storedTheme}
          onSave={handleSave}
          onChange={(val) => handleSecretAccessKeyChange(val)}
          collection={collection}
        />
      </div>

      <label className="block font-medium mb-2">Session Token</label>
      <div className="single-line-editor-wrapper mb-2">
        <SingleLineEditor
          value={awsv4Auth.sessionToken || ''}
          theme={storedTheme}
          onSave={handleSave}
          onChange={(val) => handleSessionTokenChange(val)}
          collection={collection}
        />
      </div>

      <label className="block font-medium mb-2">Service</label>
      <div className="single-line-editor-wrapper mb-2">
        <SingleLineEditor
          value={awsv4Auth.service || ''}
          theme={storedTheme}
          onSave={handleSave}
          onChange={(val) => handleServiceChange(val)}
          collection={collection}
        />
      </div>

      <label className="block font-medium mb-2">Region</label>
      <div className="single-line-editor-wrapper mb-2">
        <SingleLineEditor
          value={awsv4Auth.region || ''}
          theme={storedTheme}
          onSave={handleSave}
          onChange={(val) => handleRegionChange(val)}
          collection={collection}
        />
      </div>

      <label className="block font-medium mb-2">Profile Name</label>
      <div className="single-line-editor-wrapper mb-2">
        <SingleLineEditor
          value={awsv4Auth.profileName || ''}
          theme={storedTheme}
          onSave={handleSave}
          onChange={(val) => handleProfileNameChange(val)}
          collection={collection}
        />
      </div>
    </StyledWrapper>
  );
};

export default AwsV4Auth;
