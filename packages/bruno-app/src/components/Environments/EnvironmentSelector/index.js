import React, { useRef, forwardRef, useState } from 'react';
import find from 'lodash/find';
import Dropdown from 'components/Dropdown';
import { selectEnvironment } from 'providers/ReduxStore/slices/collections/actions';
import { updateEnvironmentSettingsModalVisibility } from 'providers/ReduxStore/slices/app';
import { IconSettings, IconCaretDown, IconDatabase, IconDatabaseOff } from '@tabler/icons';
import EnvironmentSettings from '../EnvironmentSettings';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
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
const EnvironmentSelector = ({ collection }) => {
  const dispatch = useDispatch();
  const dropdownTippyRef = useRef();
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const { environments, activeEnvironmentUid } = collection;
  const activeEnvironment = activeEnvironmentUid ? find(environments, (e) => e.uid === activeEnvironmentUid) : null;

  const Icon = forwardRef((props, ref) => {
    return (
      <div ref={ref} className="current-enviroment flex items-center justify-center pl-3 pr-2 py-1 select-none">
        {activeEnvironment ? activeEnvironment.name : 'No Environment'}
        <IconCaretDown className="caret" size={14} strokeWidth={2} />
      </div>
    );
  });

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
  const handleSettingsIconClick = () => {
    setOpenSettingsModal(true);
    dispatch(updateEnvironmentSettingsModalVisibility(true));
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
  const handleModalClose = () => {
    setOpenSettingsModal(false);
    dispatch(updateEnvironmentSettingsModalVisibility(false));
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
  const onDropdownCreate = (ref) => (dropdownTippyRef.current = ref);

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
  const onSelect = (environment) => {
    dispatch(selectEnvironment(environment ? environment.uid : null, collection.uid))
      .then(() => {
        if (environment) {
          toast.success(`Environment changed to ${environment.name}`);
        } else {
          toast.success(`No Environments are active now`);
        }
      })
      .catch((err) => console.log(err) && toast.error('An error occurred while selecting the environment'));
  };

  return (
    <StyledWrapper>
      <div className="flex items-center cursor-pointer environment-selector">
        <Dropdown onCreate={onDropdownCreate} icon={<Icon />} placement="bottom-end">
          {environments && environments.length
            ? environments.map((e) => (
                <div
                  className="dropdown-item"
                  key={e.uid}
                  onClick={() => {
                    onSelect(e);
                    dropdownTippyRef.current.hide();
                  }}
                >
                  <IconDatabase size={18} strokeWidth={1.5} /> <span className="ml-2 break-all">{e.name}</span>
                </div>
              ))
            : null}
          <div
            className="dropdown-item"
            onClick={() => {
              dropdownTippyRef.current.hide();
              onSelect(null);
            }}
          >
            <IconDatabaseOff size={18} strokeWidth={1.5} />
            <span className="ml-2">No Environment</span>
          </div>
          <div className="dropdown-item border-top" onClick={handleSettingsIconClick}>
            <div className="pr-2 text-gray-600">
              <IconSettings size={18} strokeWidth={1.5} />
            </div>
            <span>Configure</span>
          </div>
        </Dropdown>
      </div>
      {openSettingsModal && <EnvironmentSettings collection={collection} onClose={handleModalClose} />}
    </StyledWrapper>
  );
};

export default EnvironmentSelector;
