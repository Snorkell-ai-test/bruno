import React, { useState, useEffect } from 'react';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StyledWrapper from './StyledWrapper';
import Modal from 'components//Modal';

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
const SaveRequest = ({ items, onClose }) => {
  const [showFolders, setShowFolders] = useState([]);

  useEffect(() => {
    setShowFolders(items || []);
  }, [items]);

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
  const handleFolderClick = (folder) => {
    let subFolders = [];
    if (folder.items && folder.items.length) {
      for (let item of folder.items) {
        if (item.items) {
          subFolders.push(item);
        }
      }

      if (subFolders.length) {
        setShowFolders(subFolders);
      }
    }
  };

  return (
    <StyledWrapper>
      <Modal
        size="md"
        title="Save Request"
        confirmText="Save"
        cancelText="Cancel"
        handleCancel={onClose}
        handleConfirm={onClose}
      >
        <p className="mb-2">Select a folder to save request:</p>
        <div className="folder-list">
          {showFolders && showFolders.length
            ? showFolders.map((folder) => (
                <div key={folder.uid} className="folder-name" onClick={() => handleFolderClick(folder)}>
                  <FontAwesomeIcon className="mr-3 text-gray-500" icon={faFolder} style={{ fontSize: 20 }} />
                  {folder.name}
                </div>
              ))
            : null}
        </div>
      </Modal>
    </StyledWrapper>
  );
};

export default SaveRequest;
