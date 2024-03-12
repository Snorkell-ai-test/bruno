import React from 'react';
import { IconSpeakerphone, IconBrandTwitter, IconBrandGithub, IconBrandDiscord, IconBook } from '@tabler/icons';
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
const Support = () => {
  return (
    <StyledWrapper>
      <div className="rows">
        <div className="mt-2">
          <a href="https://docs.usebruno.com" target="_blank" className="flex items-end">
            <IconBook size={18} strokeWidth={2} />
            <span className="label ml-2">Documentation</span>
          </a>
        </div>
        <div className="mt-2">
          <a href="https://github.com/usebruno/bruno/issues" target="_blank" className="flex items-end">
            <IconSpeakerphone size={18} strokeWidth={2} />
            <span className="label ml-2">Report Issues</span>
          </a>
        </div>
        <div className="mt-2">
          <a href="https://discord.com/invite/KgcZUncpjq" target="_blank" className="flex items-end">
            <IconBrandDiscord size={18} strokeWidth={2} />
            <span className="label ml-2">Discord</span>
          </a>
        </div>
        <div className="mt-2">
          <a href="https://github.com/usebruno/bruno" target="_blank" className="flex items-end">
            <IconBrandGithub size={18} strokeWidth={2} />
            <span className="label ml-2">GitHub</span>
          </a>
        </div>
        <div className="mt-2">
          <a href="https://twitter.com/use_bruno" target="_blank" className="flex items-end">
            <IconBrandTwitter size={18} strokeWidth={2} />
            <span className="label ml-2">Twitter</span>
          </a>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default Support;
