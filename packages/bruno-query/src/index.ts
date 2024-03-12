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
function normalize(value: any) {
  if (!Array.isArray(value)) return value;

  const values = [] as any[];

  value.forEach((item) => {
    const value = normalize(item);
    if (value != null) {
      values.push(...(Array.isArray(value) ? value : [value]));
    }
  });

  return values.length ? values : undefined;
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
function getValue(source: any, prop: string, deep = false): any {
  if (typeof source !== 'object') return;

  let value;

  if (Array.isArray(source)) {
    value = source.map((item) => getValue(item, prop, deep));
  } else {
    value = source[prop];
    if (deep) {
      value = [value];
      for (const [key, item] of Object.entries(source)) {
        if (key !== prop && typeof item === 'object') {
          value.push(getValue(source[key], prop, deep));
        }
      }
    }
  }

  return normalize(value);
}

type PredicateOrMapper = ((obj: any) => any) | Record<string, any>;

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
function objectPredicate(obj: Record<string, any>) {
  return (item: any) => {
    for (const [key, value] of Object.entries(obj)) {
      if (item[key] !== value) return false;
    }
    return true;
  };
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
function filterOrMap(source: any, funOrObj: PredicateOrMapper) {
  const fun = typeof funOrObj === 'object' ? objectPredicate(funOrObj) : funOrObj;
  const isArray = Array.isArray(source);
  const list = isArray ? source : [source];
  const result = [] as any[];
  for (const item of list) {
    if (item == null) continue;
    const value = fun(item);
    if (value === true) {
      result.push(item); // predicate
    } else if (value != null && value !== false) {
      result.push(value); // mapper
    }
  }
  return normalize(isArray ? result : result[0]);
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
export function get(source: any, path: string, ...fns: PredicateOrMapper[]) {
  const paths = path
    .replace(/\s+/g, '')
    .split(/(\.{1,2}|\[\?\]|\[\d+\])/g) // ["..", "items", "[?]", ".", "amount", "[0]" ]
    .filter((s) => s.length > 0)
    .map((str) => {
      str = str.replace(/\[|\]/g, '');
      const index = parseInt(str);
      return isNaN(index) ? str : index;
    });

  let index = 0,
    lookbehind = '' as string | number,
    funIndex = 0;

  while (source != null && index < paths.length) {
    const token = paths[index++];

    switch (true) {
      case token === '..':
      case token === '.':
        break;
      case token === '?':
        const fun = fns[funIndex++];
        if (fun == null) throw new Error(`missing function for ${lookbehind}`);
        source = filterOrMap(source, fun);
        break;
      case typeof token === 'number':
        source = normalize(source[token]);
        break;
      default:
        source = getValue(source, token as string, lookbehind === '..');
    }

    lookbehind = token;
  }

  return source;
}
