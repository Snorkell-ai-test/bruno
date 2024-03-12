// See https://usehooks.com/useOnClickOutside/
import { useEffect } from 'react';

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
const useOnClickOutside = (ref, handler) => {
  useEffect(
    () => {
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
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
};

export default useOnClickOutside;
