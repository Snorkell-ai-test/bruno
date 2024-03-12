import React from 'react';
import { IconAlertTriangle } from '@tabler/icons';
import Modal from 'components/Modal';

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
const ConfirmRequestClose = ({ item, onCancel, onCloseWithoutSave, onSaveAndClose }) => {
  return (
    <Modal
      size="md"
      title="Unsaved changes"
      confirmText="Save and Close"
      cancelText="Close without saving"
      disableEscapeKey={true}
      disableCloseOnOutsideClick={true}
      closeModalFadeTimeout={150}
      handleCancel={onCancel}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      hideFooter={true}
    >
      <div className="flex items-center font-normal">
        <IconAlertTriangle size={32} strokeWidth={1.5} className="text-yellow-600" />
        <h1 className="ml-2 text-lg font-semibold">Hold on..</h1>
      </div>
      <div className="font-normal mt-4">
        You have unsaved changes in request <span className="font-semibold">{item.name}</span>.
      </div>

      <div className="flex justify-between mt-6">
        <div>
          <button className="btn btn-sm btn-danger" onClick={onCloseWithoutSave}>
            Don't Save
          </button>
        </div>
        <div>
          <button className="btn btn-close btn-sm mr-2" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-secondary btn-sm" onClick={onSaveAndClose}>
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmRequestClose;
