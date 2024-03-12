import React, { useEffect, useRef, forwardRef } from 'react';
import useGraphqlSchema from './useGraphqlSchema';
import { IconBook, IconDownload, IconLoader2, IconRefresh } from '@tabler/icons';
import get from 'lodash/get';
import { findEnvironmentInCollection } from 'utils/collections';
import Dropdown from '../../Dropdown';

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
const GraphQLSchemaActions = ({ item, collection, onSchemaLoad, toggleDocs }) => {
  const url = item.draft ? get(item, 'draft.request.url') : get(item, 'request.url');
  const environment = findEnvironmentInCollection(collection, collection.activeEnvironmentUid);
  const request = item.draft ? item.draft.request : item.request;

  let {
    schema,
    schemaSource,
    loadSchema,
    isLoading: isSchemaLoading
  } = useGraphqlSchema(url, environment, request, collection);

  useEffect(() => {
    if (onSchemaLoad) {
      onSchemaLoad(schema);
    }
  }, [schema]);

  const schemaDropdownTippyRef = useRef();
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
  const onSchemaDropdownCreate = (ref) => (schemaDropdownTippyRef.current = ref);

  const MenuIcon = forwardRef((props, ref) => {
    return (
      <div ref={ref} className="dropdown-icon cursor-pointer flex hover:underline ml-2">
        {isSchemaLoading && <IconLoader2 className="animate-spin" size={18} strokeWidth={1.5} />}
        {!isSchemaLoading && schema && <IconRefresh size={18} strokeWidth={1.5} />}
        {!isSchemaLoading && !schema && <IconDownload size={18} strokeWidth={1.5} />}
        <span className="ml-1">Schema</span>
      </div>
    );
  });

  return (
    <div className="flex flex-grow justify-end items-center" style={{ fontSize: 13 }}>
      <div className="flex items-center cursor-pointer hover:underline" onClick={toggleDocs}>
        <IconBook size={18} strokeWidth={1.5} />
        <span className="ml-1">Docs</span>
      </div>
      <Dropdown onCreate={onSchemaDropdownCreate} icon={<MenuIcon />} placement="bottom-start">
        <div
          className="dropdown-item"
          onClick={(e) => {
            schemaDropdownTippyRef.current.hide();
            loadSchema('introspection');
          }}
        >
          {schema && schemaSource === 'introspection' ? 'Refresh from Introspection' : 'Load from Introspection'}
        </div>
        <div
          className="dropdown-item"
          onClick={(e) => {
            schemaDropdownTippyRef.current.hide();
            loadSchema('file');
          }}
        >
          Load from File
        </div>
      </Dropdown>
    </div>
  );
};

export default GraphQLSchemaActions;
