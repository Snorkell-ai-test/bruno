const { each, filter } = require('lodash');

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
const sortCollection = (collection) => {
  const items = collection.items || [];
  let folderItems = filter(items, (item) => item.type === 'folder');
  let requestItems = filter(items, (item) => item.type !== 'folder');

  folderItems = folderItems.sort((a, b) => a.name.localeCompare(b.name));
  requestItems = requestItems.sort((a, b) => a.seq - b.seq);

  collection.items = folderItems.concat(requestItems);

  each(folderItems, (item) => {
    sortCollection(item);
  });
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
const sortFolder = (folder = {}) => {
  const items = folder.items || [];
  let folderItems = filter(items, (item) => item.type === 'folder');
  let requestItems = filter(items, (item) => item.type !== 'folder');

  folderItems = folderItems.sort((a, b) => a.name.localeCompare(b.name));
  requestItems = requestItems.sort((a, b) => a.seq - b.seq);

  folder.items = folderItems.concat(requestItems);

  each(folderItems, (item) => {
    sortFolder(item);
  });

  return folder;
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
const findItemInCollection = (collection, itemId) => {
  let item = null;

  if (collection.uid === itemId) {
    return collection;
  }

  if (collection.items && collection.items.length) {
    collection.items.forEach((item) => {
      if (item.uid === itemId) {
        item = item;
      } else if (item.type === 'folder') {
        item = findItemInCollection(item, itemId);
      }
    });
  }

  return item;
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
const getAllRequestsInFolderRecursively = (folder = {}) => {
  let requests = [];

  if (folder.items && folder.items.length) {
    folder.items.forEach((item) => {
      if (item.type !== 'folder') {
        requests.push(item);
      } else {
        requests = requests.concat(getAllRequestsInFolderRecursively(item));
      }
    });
  }

  return requests;
};

module.exports = {
  sortCollection,
  sortFolder,
  findItemInCollection,
  getAllRequestsInFolderRecursively
};
