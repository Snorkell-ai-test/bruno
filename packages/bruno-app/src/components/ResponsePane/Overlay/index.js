import React from 'react';
import { IconRefresh } from '@tabler/icons';
import { useDispatch } from 'react-redux';
import { cancelRequest } from 'providers/ReduxStore/slices/collections/actions';
import StopWatch from '../../StopWatch';
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
const ResponseLoadingOverlay = ({ item, collection }) => {
  const dispatch = useDispatch();

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
  const handleCancelRequest = () => {
    dispatch(cancelRequest(item.cancelTokenUid, item, collection));
  };

  return (
    <StyledWrapper className="px-3 w-full">
      <div className="overlay">
        <div style={{ marginBottom: 15, fontSize: 26 }}>
          <div style={{ display: 'inline-block', fontSize: 20, marginLeft: 5, marginRight: 5 }}>
            <StopWatch requestTimestamp={item?.requestSent?.timestamp} />
          </div>
        </div>
        <IconRefresh size={24} className="loading-icon" />
        <button
          onClick={handleCancelRequest}
          className="mt-4 uppercase btn-sm rounded btn-secondary ease-linear transition-all duration-150"
          type="button"
        >
          Cancel Request
        </button>
      </div>
    </StyledWrapper>
  );
};

export default ResponseLoadingOverlay;
