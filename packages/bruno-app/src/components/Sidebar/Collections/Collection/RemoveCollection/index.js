import React from 'react';
import toast from 'react-hot-toast';
import Modal from 'components/Modal';
import { useDispatch } from 'react-redux';
import { IconFiles } from '@tabler/icons';
import { removeCollection } from 'providers/ReduxStore/slices/collections/actions';

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
const RemoveCollection = ({ onClose, collection }) => {
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
  const onConfirm = () => {
    dispatch(removeCollection(collection.uid))
      .then(() => {
        toast.success('Collection closed');
        onClose();
      })
      .catch(() => toast.error('An error occurred while closing the collection'));
  };

  return (
    <Modal size="sm" title="Close Collection" confirmText="Close" handleConfirm={onConfirm} handleCancel={onClose}>
      <div className="flex items-center">
        <IconFiles size={18} strokeWidth={1.5} />
        <span className="ml-2 mr-4 font-semibold">{collection.name}</span>
      </div>
      <div className="break-words text-xs mt-1">{collection.pathname}</div>
      <div className="mt-4">
        Are you sure you want to close collection <span className="font-semibold">{collection.name}</span> in Bruno?
      </div>
      <div className="mt-4">
        It will still be available in the file system at the above location and can be re-opened later.
      </div>
    </Modal>
  );
};

export default RemoveCollection;
