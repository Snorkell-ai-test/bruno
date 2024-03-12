const { NodeVM } = require('vm2');
const chai = require('chai');
const path = require('path');
const http = require('http');
const https = require('https');
const stream = require('stream');
const util = require('util');
const zlib = require('zlib');
const url = require('url');
const punycode = require('punycode');
const fs = require('fs');
const { get } = require('lodash');
const Bru = require('../bru');
const BrunoRequest = require('../bruno-request');
const BrunoResponse = require('../bruno-response');
const Test = require('../test');
const TestResults = require('../test-results');
const { cleanJson } = require('../utils');

// Inbuilt Library Support
const ajv = require('ajv');
const addFormats = require('ajv-formats');
const atob = require('atob');
const btoa = require('btoa');
const lodash = require('lodash');
const moment = require('moment');
const uuid = require('uuid');
const nanoid = require('nanoid');
const axios = require('axios');
const fetch = require('node-fetch');
const CryptoJS = require('crypto-js');
const NodeVault = require('node-vault');

class TestRuntime {
  
  constructor() {}

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
  async runTests(
    testsFile,
    request,
    response,
    envVariables,
    collectionVariables,
    collectionPath,
    onConsoleLog,
    processEnvVars,
    scriptingConfig
  ) {
    const bru = new Bru(envVariables, collectionVariables, processEnvVars, collectionPath);
    const req = new BrunoRequest(request);
    const res = new BrunoResponse(response);
    const allowScriptFilesystemAccess = get(scriptingConfig, 'filesystemAccess.allow', false);
    const moduleWhitelist = get(scriptingConfig, 'moduleWhitelist', []);
    const additionalContextRoots = get(scriptingConfig, 'additionalContextRoots', []);
    const additionalContextRootsAbsolute = lodash
      .chain(additionalContextRoots)
      .map((acr) => (acr.startsWith('/') ? acr : path.join(collectionPath, acr)))
      .value();

    const whitelistedModules = {};

    for (let module of moduleWhitelist) {
      try {
        whitelistedModules[module] = require(module);
      } catch (e) {
        // Ignore
        console.warn(e);
      }
    }

    const __brunoTestResults = new TestResults();
    const test = Test(__brunoTestResults, chai);

    if (!testsFile || !testsFile.length) {
      return {
        request,
        envVariables,
        collectionVariables,
        results: __brunoTestResults.getResults()
      };
    }

    const context = {
      test,
      bru,
      req,
      res,
      expect: chai.expect,
      assert: chai.assert,
      __brunoTestResults: __brunoTestResults
    };

    if (onConsoleLog && typeof onConsoleLog === 'function') {
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
      const customLogger = (type) => {
        return (...args) => {
          onConsoleLog(type, cleanJson(args));
        };
      };
      context.console = {
        log: customLogger('log'),
        info: customLogger('info'),
        warn: customLogger('warn'),
        error: customLogger('error')
      };
    }

    const vm = new NodeVM({
      sandbox: context,
      require: {
        context: 'sandbox',
        external: true,
        root: [collectionPath, ...additionalContextRootsAbsolute],
        mock: {
          // node libs
          path,
          stream,
          util,
          url,
          http,
          https,
          punycode,
          zlib,
          // 3rd party libs
          ajv,
          'ajv-formats': addFormats,
          btoa,
          atob,
          lodash,
          moment,
          uuid,
          nanoid,
          axios,
          chai,
          'node-fetch': fetch,
          'crypto-js': CryptoJS,
          ...whitelistedModules,
          fs: allowScriptFilesystemAccess ? fs : undefined,
          'node-vault': NodeVault
        }
      }
    });

    const asyncVM = vm.run(`module.exports = async () => { ${testsFile}}`, path.join(collectionPath, 'vm.js'));
    await asyncVM();

    return {
      request,
      envVariables: cleanJson(envVariables),
      collectionVariables: cleanJson(collectionVariables),
      results: cleanJson(__brunoTestResults.getResults())
    };
  }
}

module.exports = TestRuntime;
