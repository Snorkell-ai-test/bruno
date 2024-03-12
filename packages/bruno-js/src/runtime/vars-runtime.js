const _ = require('lodash');
const Bru = require('../bru');
const BrunoRequest = require('../bruno-request');
const { evaluateJsTemplateLiteral, evaluateJsExpression, createResponseParser } = require('../utils');

class VarsRuntime {
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
  runPreRequestVars(vars, request, envVariables, collectionVariables, collectionPath, processEnvVars) {
    const enabledVars = _.filter(vars, (v) => v.enabled);
    if (!enabledVars.length) {
      return;
    }

    const bru = new Bru(envVariables, collectionVariables, processEnvVars);
    const req = new BrunoRequest(request);

    const bruContext = {
      bru,
      req
    };

    const context = {
      ...envVariables,
      ...collectionVariables,
      ...bruContext
    };

    _.each(enabledVars, (v) => {
      const value = evaluateJsTemplateLiteral(v.value, context);
      bru.setVar(v.name, value);
    });

    return {
      collectionVariables
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
  runPostResponseVars(vars, request, response, envVariables, collectionVariables, collectionPath, processEnvVars) {
    const enabledVars = _.filter(vars, (v) => v.enabled);
    if (!enabledVars.length) {
      return;
    }

    const bru = new Bru(envVariables, collectionVariables, processEnvVars);
    const req = new BrunoRequest(request);
    const res = createResponseParser(response);

    const bruContext = {
      bru,
      req,
      res
    };

    const context = {
      ...envVariables,
      ...collectionVariables,
      ...bruContext
    };

    _.each(enabledVars, (v) => {
      const value = evaluateJsExpression(v.value, context);
      bru.setVar(v.name, value);
    });

    return {
      envVariables,
      collectionVariables
    };
  }
}

module.exports = VarsRuntime;
