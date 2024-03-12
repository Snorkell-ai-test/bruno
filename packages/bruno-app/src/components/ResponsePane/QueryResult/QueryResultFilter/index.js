import { IconFilter, IconX } from '@tabler/icons';
import React, { useMemo } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

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
const QueryResultFilter = ({ filter, onChange, mode }) => {
  const inputRef = useRef(null);
  const [isExpanded, toggleExpand] = useState(false);

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
  const handleFilterClick = () => {
    // Toggle filter search bar
    toggleExpand(!isExpanded);
    // Reset filter search input
    onChange({ target: { value: '' } });
    // Reset input value
    if (inputRef?.current) {
      inputRef.current.value = '';
    }
  };

  const tooltipText = useMemo(() => {
    if (mode.includes('json')) {
      return 'Filter with JSONPath';
    }

    if (mode.includes('xml')) {
      return 'Filter with XPath';
    }

    return null;
  }, [mode]);

  const placeholderText = useMemo(() => {
    if (mode.includes('json')) {
      return '$.store.books..author';
    }

    if (mode.includes('xml')) {
      return '/store/books//author';
    }

    return null;
  }, [mode]);

  return (
    <div
      className={
        'response-filter absolute bottom-2 w-full justify-end right-0 flex flex-row items-center gap-2 py-4 px-2'
      }
    >
      {tooltipText && !isExpanded && <ReactTooltip anchorId={'request-filter-icon'} html={tooltipText} />}
      <input
        ref={inputRef}
        type="text"
        name="response-filter"
        id="response-filter"
        placeholder={placeholderText}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        className={`block ml-14 p-2 py-1 sm:text-sm transition-all duration-200 ease-in-out border border-gray-300 rounded-md ${
          isExpanded ? 'w-full opacity-100' : 'w-[0] opacity-0'
        }`}
        onChange={onChange}
      />
      <div className="text-gray-500 sm:text-sm cursor-pointer" id="request-filter-icon" onClick={handleFilterClick}>
        {isExpanded ? <IconX size={20} strokeWidth={1.5} /> : <IconFilter size={20} strokeWidth={1.5} />}
      </div>
    </div>
  );
};

export default QueryResultFilter;
