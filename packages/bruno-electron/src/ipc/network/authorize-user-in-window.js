const { BrowserWindow } = require('electron');

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
const authorizeUserInWindow = ({ authorizeUrl, callbackUrl, session }) => {
  return new Promise(async (resolve, reject) => {
    let finalUrl = null;

    let allOpenWindows = BrowserWindow.getAllWindows();

    // main window id is '1'
    // get all other windows
    let windowsExcludingMain = allOpenWindows.filter((w) => w.id != 1);
    windowsExcludingMain.forEach((w) => {
      w.close();
    });

    const window = new BrowserWindow({
      webPreferences: {
        nodeIntegration: false,
        partition: session
      },
      show: false
    });
    window.on('ready-to-show', window.show.bind(window));

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
    function onWindowRedirect(url) {
      // check if the url contains an authorization code
      if (url.match(/(code=).*/)) {
        finalUrl = url;
        if (!url || !finalUrl.includes(callbackUrl)) {
          reject(new Error('Invalid Callback Url'));
        }
        window.close();
      }
      if (url.match(/(error=).*/) || url.match(/(error_description=).*/) || url.match(/(error_uri=).*/)) {
        const _url = new URL(url);
        const error = _url.searchParams.get('error');
        const errorDescription = _url.searchParams.get('error_description');
        const errorUri = _url.searchParams.get('error_uri');
        let errorData = {
          message: 'Authorization Failed!',
          error,
          errorDescription,
          errorUri
        };
        reject(new Error(JSON.stringify(errorData)));
        window.close();
      }
    }

    window.on('close', () => {
      if (finalUrl) {
        try {
          const callbackUrlWithCode = new URL(finalUrl);
          const authorizationCode = callbackUrlWithCode.searchParams.get('code');

          return resolve({ authorizationCode });
        } catch (error) {
          return reject(error);
        }
      } else {
        return reject(new Error('Authorization window closed'));
      }
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
    // wait for the window to navigate to the callback url
    const didNavigateListener = (_, url) => {
      onWindowRedirect(url);
    };
    window.webContents.on('did-navigate', didNavigateListener);
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
    const willRedirectListener = (_, authorizeUrl) => {
      onWindowRedirect(authorizeUrl);
    };
    window.webContents.on('will-redirect', willRedirectListener);

    try {
      await window.loadURL(authorizeUrl);
    } catch (error) {
      reject(error);
      window.close();
    }
  });
};

module.exports = { authorizeUserInWindow };
