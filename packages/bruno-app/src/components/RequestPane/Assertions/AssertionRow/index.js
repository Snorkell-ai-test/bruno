import React from 'react';
import { IconTrash } from '@tabler/icons';
import SingleLineEditor from 'components/SingleLineEditor';
import AssertionOperator from '../AssertionOperator';
import { useTheme } from 'providers/Theme';

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
const parseAssertionOperator = (str = '') => {
  if (!str || typeof str !== 'string' || !str.length) {
    return {
      operator: 'eq',
      value: str
    };
  }

  const operators = [
    'eq',
    'neq',
    'gt',
    'gte',
    'lt',
    'lte',
    'in',
    'notIn',
    'contains',
    'notContains',
    'length',
    'matches',
    'notMatches',
    'startsWith',
    'endsWith',
    'between',
    'isEmpty',
    'isNull',
    'isUndefined',
    'isDefined',
    'isTruthy',
    'isFalsy',
    'isJson',
    'isNumber',
    'isString',
    'isBoolean'
  ];

  const unaryOperators = [
    'isEmpty',
    'isNull',
    'isUndefined',
    'isDefined',
    'isTruthy',
    'isFalsy',
    'isJson',
    'isNumber',
    'isString',
    'isBoolean'
  ];

  const [operator, ...rest] = str.trim().split(' ');
  const value = rest.join(' ');

  if (unaryOperators.includes(operator)) {
    return {
      operator,
      value: ''
    };
  }

  if (operators.includes(operator)) {
    return {
      operator,
      value
    };
  }

  return {
    operator: 'eq',
    value: str
  };
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
const isUnaryOperator = (operator) => {
  const unaryOperators = [
    'isEmpty',
    'isNull',
    'isUndefined',
    'isDefined',
    'isTruthy',
    'isFalsy',
    'isJson',
    'isNumber',
    'isString',
    'isBoolean'
  ];

  return unaryOperators.includes(operator);
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
const AssertionRow = ({
  item,
  collection,
  assertion,
  handleAssertionChange,
  handleRemoveAssertion,
  onSave,
  handleRun
}) => {
  const { storedTheme } = useTheme();

  const { operator, value } = parseAssertionOperator(assertion.value);

  return (
    <tr key={assertion.uid}>
      <td>
        <input
          type="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          value={assertion.name}
          className="mousetrap"
          onChange={(e) => handleAssertionChange(e, assertion, 'name')}
        />
      </td>
      <td>
        <AssertionOperator
          operator={operator}
          onChange={(op) =>
            handleAssertionChange(
              {
                target: {
                  value: `${op} ${value}`
                }
              },
              assertion,
              'value'
            )
          }
        />
      </td>
      <td>
        {!isUnaryOperator(operator) ? (
          <SingleLineEditor
            value={value}
            theme={storedTheme}
            readOnly={true}
            onSave={onSave}
            onChange={(newValue) =>
              handleAssertionChange(
                {
                  target: {
                    value: `${operator} ${newValue}`
                  }
                },
                assertion,
                'value'
              )
            }
            onRun={handleRun}
            collection={collection}
          />
        ) : (
          <input type="text" className="cursor-default" disabled />
        )}
      </td>
      <td>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={assertion.enabled}
            tabIndex="-1"
            className="mr-3 mousetrap"
            onChange={(e) => handleAssertionChange(e, assertion, 'enabled')}
          />
          <button tabIndex="-1" onClick={() => handleRemoveAssertion(assertion)}>
            <IconTrash strokeWidth={1.5} size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AssertionRow;
