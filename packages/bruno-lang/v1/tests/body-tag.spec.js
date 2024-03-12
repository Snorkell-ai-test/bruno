const { bodyJsonTag } = require('../src/body-tag');

describe('bodyJsonTag', () => {
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
  const testbodyJson = (input, expected) => {
    const result = bodyJsonTag.run(input);
    expect(result.isError).toBe(false);
    expect(result.result.body.json).toEqual('{ "foo": "bar" }');
  };

  // simple case
  it('should parse json body tag - 1', () => {
    const input = 'body(type=json)\n{ "foo": "bar" }\n/body';
    testbodyJson(input, '{ "foo": "bar" }\n');
  });

  // space between body and args
  it('should parse json body tag - 2', () => {
    const input = 'body (type = json)\n{ "foo": "bar" }\n/body';
    testbodyJson(input, '{ "foo": "bar" }\n');
  });

  // space after body tag
  it('should parse json body tag - 3', () => {
    const input = 'body (type = json)  \n{ "foo": "bar" }\n/body';
    testbodyJson(input, '{ "foo": "bar" }\n');
  });

  // space after body tag
  it('should parse json body tag - 4', () => {
    const input = 'body (type = json)  \n{ "foo": "bar" }\n/body ';
    testbodyJson(input, '{ "foo": "bar" }\n');
  });

  it('should fail to parse when body tag is missing', () => {
    const input = '{ "foo": "bar" }\n/body';
    const result = bodyJsonTag.run(input);
    expect(result.isError).toBe(true);
  });

  it('should fail to parse when body end tag is missing', () => {
    const input = 'body (type = json)\n{ "foo": "bar" }';
    const result = bodyJsonTag.run(input);
    expect(result.isError).toBe(true);
  });
});
