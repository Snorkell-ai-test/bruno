/**
 * This test file is used to test the dictionary parser.
 */

const parser = require('../src/bruToJson');

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
const assertSingleHeader = (input) => {
  const output = parser(input);

  const expected = {
    headers: [
      {
        name: 'hello',
        value: 'world',
        enabled: true
      }
    ]
  };
  expect(output).toEqual(expected);
};

describe('headers parser', () => {
  it('should parse empty header', () => {
    const input = `
headers {
}`;

    const output = parser(input);
    const expected = {
      headers: []
    };
    expect(output).toEqual(expected);
  });

  it('should parse single header', () => {
    const input = `
headers {
  hello: world
}`;

    assertSingleHeader(input);
  });

  it('should parse single header with spaces', () => {
    const input = `
headers {
      hello: world   
}`;

    assertSingleHeader(input);
  });

  it('should parse single header with spaces and newlines', () => {
    const input = `
headers {

      hello: world   
  

}`;

    assertSingleHeader(input);
  });

  it('should parse single header with empty value', () => {
    const input = `
headers {
  hello:
}`;

    const output = parser(input);
    const expected = {
      headers: [
        {
          name: 'hello',
          value: '',
          enabled: true
        }
      ]
    };
    expect(output).toEqual(expected);
  });

  it('should parse multi headers', () => {
    const input = `
headers {
  content-type: application/json
    
  Authorization: JWT secret
}`;

    const output = parser(input);
    const expected = {
      headers: [
        {
          name: 'content-type',
          value: 'application/json',
          enabled: true
        },
        {
          name: 'Authorization',
          value: 'JWT secret',
          enabled: true
        }
      ]
    };
    expect(output).toEqual(expected);
  });

  it('should parse disabled headers', () => {
    const input = `
headers {
  ~content-type: application/json
}`;

    const output = parser(input);
    const expected = {
      headers: [
        {
          name: 'content-type',
          value: 'application/json',
          enabled: false
        }
      ]
    };
    expect(output).toEqual(expected);
  });

  it('should parse empty url', () => {
    const input = `
get {
  url: 
  body: json
}`;

    const output = parser(input);
    const expected = {
      http: {
        url: '',
        method: 'get',
        body: 'json'
      }
    };
    expect(output).toEqual(expected);
  });

  it('should throw error on invalid header', () => {
    const input = `
headers {
  hello: world
  foo
}`;

    expect(() => parser(input)).toThrow();
  });

  it('should throw error on invalid header', () => {
    const input = `
headers {
  hello: world
  foo: bar}`;

    expect(() => parser(input)).toThrow();
  });
});
