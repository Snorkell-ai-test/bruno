import React from 'react';
import { IconSend } from '@tabler/icons';
import StyledWrapper from './StyledWrapper';
import { isMacOS } from 'utils/common/platform';

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
const Placeholder = () => {
  const isMac = isMacOS();
  const sendRequestShortcut = isMac ? 'Cmd + Enter' : 'Ctrl + Enter';
  const newRequestShortcut = isMac ? 'Cmd + B' : 'Ctrl + B';
  const editEnvironmentShortcut = isMac ? 'Cmd + E' : 'Ctrl + E';

  return (
    <StyledWrapper>
      <div className="send-icon flex justify-center" style={{ fontSize: 200 }}>
        <IconSend size={150} strokeWidth={1} />
      </div>
      <div className="flex mt-4">
        <div className="flex flex-1 flex-col items-end px-1">
          <div className="px-1 py-2">Send Request</div>
          <div className="px-1 py-2">New Request</div>
          <div className="px-1 py-2">Edit Environments</div>
        </div>
        <div className="flex flex-1 flex-col px-1">
          <div className="px-1 py-2">{sendRequestShortcut}</div>
          <div className="px-1 py-2">{newRequestShortcut}</div>
          <div className="px-1 py-2">{editEnvironmentShortcut}</div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default Placeholder;
