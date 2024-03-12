const { ipcMain } = require('electron');
const { getPreferences, savePreferences } = require('../store/preferences');
const { isDirectory } = require('../utils/filesystem');
const { openCollection } = require('../app/collections');
``;
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
const registerPreferencesIpc = (mainWindow, watcher, lastOpenedCollections) => {
  ipcMain.handle('renderer:ready', async (event) => {
    // load preferences
    const preferences = getPreferences();
    mainWindow.webContents.send('main:load-preferences', preferences);

    // reload last opened collections
    const lastOpened = lastOpenedCollections.getAll();

    if (lastOpened && lastOpened.length) {
      for (let collectionPath of lastOpened) {
        if (isDirectory(collectionPath)) {
          await openCollection(mainWindow, watcher, collectionPath, {
            dontSendDisplayErrors: true
          });
        }
      }
    }
  });

  ipcMain.on('main:open-preferences', () => {
    mainWindow.webContents.send('main:open-preferences');
  });

  ipcMain.handle('renderer:save-preferences', async (event, preferences) => {
    try {
      await savePreferences(preferences);
    } catch (error) {
      return Promise.reject(error);
    }
  });
};

module.exports = registerPreferencesIpc;
