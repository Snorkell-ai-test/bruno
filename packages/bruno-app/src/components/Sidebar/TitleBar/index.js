import toast from 'react-hot-toast';
import Bruno from 'components/Bruno';
import Dropdown from 'components/Dropdown';
import CreateCollection from '../CreateCollection';
import ImportCollection from 'components/Sidebar/ImportCollection';
import ImportCollectionLocation from 'components/Sidebar/ImportCollectionLocation';

import { IconDots } from '@tabler/icons';
import { useState, forwardRef, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { showHomePage } from 'providers/ReduxStore/slices/app';
import { openCollection, importCollection } from 'providers/ReduxStore/slices/collections/actions';
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
const TitleBar = () => {
  const [importedCollection, setImportedCollection] = useState(null);
  const [createCollectionModalOpen, setCreateCollectionModalOpen] = useState(false);
  const [importCollectionModalOpen, setImportCollectionModalOpen] = useState(false);
  const [importCollectionLocationModalOpen, setImportCollectionLocationModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { ipcRenderer } = window;

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
  const handleImportCollection = (collection) => {
    setImportedCollection(collection);
    setImportCollectionModalOpen(false);
    setImportCollectionLocationModalOpen(true);
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
  const handleImportCollectionLocation = (collectionLocation) => {
    dispatch(importCollection(importedCollection, collectionLocation));
    setImportCollectionLocationModalOpen(false);
    setImportedCollection(null);
    toast.success('Collection imported successfully');
  };

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
  const handleTitleClick = () => dispatch(showHomePage());

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
  const handleOpenCollection = () => {
    dispatch(openCollection()).catch(
      (err) => console.log(err) && toast.error('An error occurred while opening the collection')
    );
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
  const openDevTools = () => {
    ipcRenderer.invoke('renderer:open-devtools');
  };

  return (
    <StyledWrapper className="px-2 py-2">
      {createCollectionModalOpen ? <CreateCollection onClose={() => setCreateCollectionModalOpen(false)} /> : null}
      {importCollectionModalOpen ? (
        <ImportCollection onClose={() => setImportCollectionModalOpen(false)} handleSubmit={handleImportCollection} />
      ) : null}
      {importCollectionLocationModalOpen ? (
        <ImportCollectionLocation
          collectionName={importedCollection.name}
          onClose={() => setImportCollectionLocationModalOpen(false)}
          handleSubmit={handleImportCollectionLocation}
        />
      ) : null}

      <div className="flex items-center">
        <div className="flex items-center cursor-pointer" onClick={handleTitleClick}>
          <Bruno width={30} />
        </div>
        <div
          onClick={handleTitleClick}
          className="flex items-center font-medium select-none cursor-pointer"
          style={{ fontSize: 14, paddingLeft: 6, position: 'relative', top: -1 }}
        >
          bruno
        </div>
        <div className="collection-dropdown flex flex-grow items-center justify-end">
          <Dropdown onCreate={onMenuDropdownCreate} icon={<MenuIcon />} placement="bottom-start">
            <div
              className="dropdown-item"
              onClick={(e) => {
                setCreateCollectionModalOpen(true);
                menuDropdownTippyRef.current.hide();
              }}
            >
              Create Collection
            </div>
            <div
              className="dropdown-item"
              onClick={(e) => {
                handleOpenCollection();
                menuDropdownTippyRef.current.hide();
              }}
            >
              Open Collection
            </div>
            <div
              className="dropdown-item"
              onClick={(e) => {
                menuDropdownTippyRef.current.hide();
                setImportCollectionModalOpen(true);
              }}
            >
              Import Collection
            </div>
            <div
              className="dropdown-item"
              onClick={(e) => {
                menuDropdownTippyRef.current.hide();
                openDevTools();
              }}
            >
              Devtools
            </div>
          </Dropdown>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default TitleBar;
