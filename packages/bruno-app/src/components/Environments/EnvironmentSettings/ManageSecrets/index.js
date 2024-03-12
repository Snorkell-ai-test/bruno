import React from 'react';
import Portal from 'components/Portal';
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
const ManageSecrets = ({ onClose }) => {
  return (
    <Portal>
      <Modal size="sm" title="Manage Secrets" hideFooter={true} handleConfirm={onClose} handleCancel={onClose}>
        <div>
          <p>In any collection, there are secrets that need to be managed.</p>
          <p className="mt-2">These secrets can be anything such as API keys, passwords, or tokens.</p>
          <p className="mt-4">Bruno offers two approaches to manage secrets in collections.</p>
          <p className="mt-2">
            Read more about it in our{' '}
            <a
              href="https://docs.usebruno.com/secrets-management/overview.html"
              target="_blank"
              rel="noreferrer"
              className="text-link hover:underline"
            >
              docs
            </a>
            .
          </p>
        </div>
      </Modal>
    </Portal>
  );
};

export default ManageSecrets;
