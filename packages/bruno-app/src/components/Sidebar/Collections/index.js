import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IconSearch,
  IconFolders,
  IconArrowsSort,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
  IconX
} from '@tabler/icons';
import Collection from '../Collections/Collection';
import CreateCollection from '../CreateCollection';
import StyledWrapper from './StyledWrapper';
import CreateOrOpenCollection from './CreateOrOpenCollection';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { sortCollections } from 'providers/ReduxStore/slices/collections/actions';

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
// todo: move this to a separate folder
// the coding convention is to keep all the components in a folder named after the component
const CollectionsBadge = () => {
  const dispatch = useDispatch();
  const { collections } = useSelector((state) => state.collections);
  const { collectionSortOrder } = useSelector((state) => state.collections);
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
  const sortCollectionOrder = () => {
    let order;
    switch (collectionSortOrder) {
      case 'default':
        order = 'alphabetical';
        break;
      case 'alphabetical':
        order = 'reverseAlphabetical';
        break;
      case 'reverseAlphabetical':
        order = 'default';
        break;
    }
    dispatch(sortCollections({ order }));
  };
  return (
    <div className="items-center mt-2 relative">
      <div className="collections-badge flex items-center justify-between px-2">
        <div className="flex items-center  py-1 select-none">
          <span className="mr-2">
            <IconFolders size={18} strokeWidth={1.5} />
          </span>
          <span>Collections</span>
        </div>
        {collections.length >= 1 && (
          <button onClick={() => sortCollectionOrder()}>
            {collectionSortOrder == 'default' ? (
              <IconArrowsSort size={18} strokeWidth={1.5} />
            ) : collectionSortOrder == 'alphabetical' ? (
              <IconSortAscendingLetters size={18} strokeWidth={1.5} />
            ) : (
              <IconSortDescendingLetters size={18} strokeWidth={1.5} />
            )}
          </button>
        )}
      </div>
    </div>
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
const Collections = () => {
  const [searchText, setSearchText] = useState('');
  const { collections } = useSelector((state) => state.collections);
  const [createCollectionModalOpen, setCreateCollectionModalOpen] = useState(false);

  if (!collections || !collections.length) {
    return (
      <StyledWrapper>
        <CollectionsBadge />
        <CreateOrOpenCollection />
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      {createCollectionModalOpen ? <CreateCollection onClose={() => setCreateCollectionModalOpen(false)} /> : null}

      <CollectionsBadge />

      <div className="mt-4 relative collection-filter px-2">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">
            <IconSearch size={16} strokeWidth={1.5} />
          </span>
        </div>
        <input
          type="text"
          name="search"
          id="search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          className="block w-full pl-7 py-1 sm:text-sm"
          placeholder="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value.toLowerCase())}
        />
        {searchText !== '' && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <span
              className="close-icon"
              onClick={() => {
                setSearchText('');
              }}
            >
              <IconX size={16} strokeWidth={1.5} className="cursor-pointer" />
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col overflow-y-auto absolute top-32 bottom-10 left-0 right-0">
        {collections && collections.length
          ? collections.map((c) => {
              return (
                <DndProvider backend={HTML5Backend} key={c.uid}>
                  <Collection searchText={searchText} collection={c} key={c.uid} />
                </DndProvider>
              );
            })
          : null}
      </div>
    </StyledWrapper>
  );
};

export default Collections;
