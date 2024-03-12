import themes from 'themes/index';
import useLocalStorage from 'hooks/useLocalStorage/index';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

export const ThemeContext = createContext();
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
export const ThemeProvider = (props) => {
  const isBrowserThemeLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const [displayedTheme, setDisplayedTheme] = useState(isBrowserThemeLight ? 'light' : 'dark');
  const [storedTheme, setStoredTheme] = useLocalStorage('bruno.theme', 'system');

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (storedTheme !== 'system') return;
      setDisplayedTheme(e.matches ? 'light' : 'dark');
    });
  }, []);

  useEffect(() => {
    if (storedTheme === 'system') {
      const isBrowserThemeLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      setDisplayedTheme(isBrowserThemeLight ? 'light' : 'dark');
    } else {
      setDisplayedTheme(storedTheme);
    }
  }, [storedTheme, setDisplayedTheme, window.matchMedia]);

  // storedTheme can have 3 values: 'light', 'dark', 'system'
  // displayedTheme can have 2 values: 'light', 'dark'

  const theme = storedTheme === 'system' ? themes[displayedTheme] : themes[storedTheme];
  const themeOptions = Object.keys(themes);
  const value = {
    theme,
    themeOptions,
    storedTheme,
    displayedTheme,
    setStoredTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      <SCThemeProvider theme={theme} {...props} />
    </ThemeContext.Provider>
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
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(`useTheme must be used within a ThemeProvider`);
  }

  return context;
};

export default ThemeProvider;
