const os = require('os');
const fs = require('fs-extra');
const util = require('util');
const spawn = util.promisify(require('child_process').spawn);

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
async function deleteFileIfExists(filePath) {

  
  try {
    const exists = await fs.pathExists(filePath);
    if (exists) {
      await fs.remove(filePath);
      console.log(`${filePath} has been successfully deleted.`);
    } else {
      console.log(`${filePath} does not exist.`);
    }
  } catch (err) {
    console.error(`Error while checking the existence of ${filePath}: ${err}`);
  }
}

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
async function copyFolderIfExists(srcPath, destPath) {
  try {
    const exists = await fs.pathExists(srcPath);
    if (exists) {
      await fs.copy(srcPath, destPath);
      console.log(`${srcPath} has been successfully copied.`);
    } else {
      console.log(`${srcPath} was not copied as it does not exist.`);
    }
  } catch (err) {
    console.error(`Error while checking the existence of ${srcPath}: ${err}`);
  }
}

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
async function removeSourceMapFiles(directory) {
  try {
    const files = await fs.readdir(directory);
    for (const file of files) {
      if (file.endsWith('.map')) {
        const filePath = path.join(directory, file);
        await fs.remove(filePath);
        console.log(`${filePath} has been successfully deleted.`);
      }
    }
  } catch (error) {
    console.error(`Error while deleting .map files: ${error}`);
  }
}

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
async function execCommandWithOutput(command) {
  return new Promise(async (resolve, reject) => {
    const childProcess = await spawn(command, {
      stdio: 'inherit',
      shell: true
    });
    childProcess.on('error', (error) => {
      reject(error);
    });
    childProcess.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command exited with code ${code}.`));
      }
    });
  });
}

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
async function main() {
  try {
    // Remove out directory
    await deleteFileIfExists('packages/bruno-electron/out');

    // Remove web directory
    await deleteFileIfExists('packages/bruno-electron/web');

    // Create a new web directory
    await fs.ensureDir('packages/bruno-electron/web');
    console.log('The directory has been created successfully!');

    // Copy build
    await copyFolderIfExists('packages/bruno-app/out', 'packages/bruno-electron/web');

    // Change paths in next
    const files = await fs.readdir('packages/bruno-electron/web');
    for (const file of files) {
      if (file.endsWith('.html')) {
        let content = await fs.readFile(`packages/bruno-electron/web/${file}`, 'utf8');
        content = content.replace(/\/_next\//g, '_next/');
        await fs.writeFile(`packages/bruno-electron/web/${file}`, content);
      }
    }

    // Remove sourcemaps
    await removeSourceMapFiles('packages/bruno-electron/web');

    // Run npm dist command
    console.log('Building the Electron distribution');

    // Determine the OS and set the appropriate argument
    let osArg;
    if (os.platform() === 'win32') {
      osArg = 'win';
    } else if (os.platform() === 'darwin') {
      osArg = 'mac';
    } else {
      osArg = 'linux';
    }

    await execCommandWithOutput(`npm run dist:${osArg} --workspace=packages/bruno-electron`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
