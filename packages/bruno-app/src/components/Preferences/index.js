import Modal from 'components/Modal/index';
import classnames from 'classnames';
import React, { useState } from 'react';
import Support from './Support';
import General from './General';
import Font from './Font';
import Theme from './Theme';
import Proxy from './ProxySettings';
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
const Preferences = ({ onClose }) => {
  const [tab, setTab] = useState('general');

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
  const getTabClassname = (tabName) => {
    return classnames(`tab select-none ${tabName}`, {
      active: tabName === tab
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
  const getTabPanel = (tab) => {
    switch (tab) {
      case 'general': {
        return <General close={onClose} />;
      }

      case 'proxy': {
        return <Proxy close={onClose} />;
      }

      case 'theme': {
        return <Theme close={onClose} />;
      }

      case 'support': {
        return <Support />;
      }

      case 'font': {
        return <Font close={onClose} />;
      }
    }
  };

  return (
    <StyledWrapper>
      <Modal size="lg" title="Preferences" handleCancel={onClose} hideFooter={true}>
        <div className="flex items-center px-2 tabs" role="tablist">
          <div className={getTabClassname('general')} role="tab" onClick={() => setTab('general')}>
            General
          </div>
          <div className={getTabClassname('theme')} role="tab" onClick={() => setTab('theme')}>
            Theme
          </div>
          <div className={getTabClassname('font')} role="tab" onClick={() => setTab('font')}>
            Font
          </div>
          <div className={getTabClassname('proxy')} role="tab" onClick={() => setTab('proxy')}>
            Proxy
          </div>
          <div className={getTabClassname('support')} role="tab" onClick={() => setTab('support')}>
            Support
          </div>
        </div>
        <section className="flex flex-grow px-2 mt-4 tab-panel">{getTabPanel(tab)}</section>
      </Modal>
    </StyledWrapper>
  );
};

export default Preferences;
