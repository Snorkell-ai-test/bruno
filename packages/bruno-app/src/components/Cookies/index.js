import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'components/Modal';
import { IconTrash } from '@tabler/icons';
import { deleteCookiesForDomain } from 'providers/ReduxStore/slices/app';
import toast from 'react-hot-toast';

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
const CollectionProperties = ({ onClose }) => {
  const dispatch = useDispatch();
  const cookies = useSelector((state) => state.app.cookies) || [];

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
  const handleDeleteDomain = (domain) => {
    dispatch(deleteCookiesForDomain(domain))
      .then(() => {
        toast.success('Domain deleted successfully');
      })
      .catch((err) => console.log(err) && toast.error('Failed to delete domain'));
  };

  return (
    <Modal size="md" title="Cookies" hideFooter={true} handleCancel={onClose}>
      <StyledWrapper>
        <table className="w-full border-collapse" style={{ marginTop: '-1rem' }}>
          <thead>
            <tr>
              <th className="py-2 px-2 text-left">Domain</th>
              <th className="py-2 px-2 text-left">Cookie</th>
              <th className="py-2 px-2 text-center" style={{ width: 80 }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {cookies.map((cookie) => (
              <tr key={cookie.domain}>
                <td className="py-2 px-2">{cookie.domain}</td>
                <td className="py-2 px-2 break-all">{cookie.cookieString}</td>
                <td className="text-center">
                  <button tabIndex="-1" onClick={() => handleDeleteDomain(cookie.domain)}>
                    <IconTrash strokeWidth={1.5} size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </StyledWrapper>
    </Modal>
  );
};

export default CollectionProperties;
