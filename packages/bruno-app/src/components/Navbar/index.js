import React, { useState, forwardRef, useRef } from 'react';
import Dropdown from '../Dropdown';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconBox, IconSearch, IconDots } from '@tabler/icons';
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
const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const menuDropdownTippyRef = useRef();
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
  const onMenuDropdownCreate = (ref) => (menuDropdownTippyRef.current = ref);
  const MenuIcon = forwardRef((props, ref) => {
    return (
      <div ref={ref} className="dropdown-icon cursor-pointer">
        <IconDots size={22} />
      </div>
    );
  });

  return (
    <StyledWrapper className="px-2 py-2 flex items-center">
      <div>
        <span className="ml-2">Collections</span>
        {/* <FontAwesomeIcon className="ml-2" icon={faCaretDown} style={{fontSize: 13}}/> */}
      </div>
      <div className="collection-dropdown flex flex-grow items-center justify-end">
        <Dropdown onCreate={onMenuDropdownCreate} icon={<MenuIcon />} placement="bottom-start">
          <div
            className="dropdown-item"
            onClick={(e) => {
              menuDropdownTippyRef.current.hide();
              setModalOpen(true);
            }}
          >
            Create Collection
          </div>
          <div
            className="dropdown-item"
            onClick={(e) => {
              menuDropdownTippyRef.current.hide();
            }}
          >
            Import Collection
          </div>
          <div
            className="dropdown-item"
            onClick={(e) => {
              menuDropdownTippyRef.current.hide();
            }}
          >
            Settings
          </div>
        </Dropdown>
      </div>
    </StyledWrapper>
  );
};

export default Navbar;
