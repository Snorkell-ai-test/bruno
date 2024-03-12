import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useTheme } from 'providers/Theme';

export const ToastContext = React.createContext();

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
export const ToastProvider = (props) => {
  const { storedTheme } = useTheme();

  const toastOptions = { duration: 2000 };
  if (storedTheme === 'dark') {
    toastOptions.style = {
      borderRadius: '10px',
      background: '#3d3d3d',
      color: '#fff'
    };
  }

  return (
    <ToastContext.Provider {...props} value="toastProvider">
      <Toaster toastOptions={toastOptions} />
      <div>{props.children}</div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
