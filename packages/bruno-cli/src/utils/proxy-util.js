const parseUrl = require('url').parse;
const { isEmpty } = require('lodash');
const { HttpsProxyAgent } = require('https-proxy-agent');

const DEFAULT_PORTS = {
  ftp: 21,
  gopher: 70,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
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
const shouldUseProxy = (url, proxyBypass) => {
  if (proxyBypass === '*') {
    return false; // Never proxy if wildcard is set.
  }

  // use proxy if no proxyBypass is set
  if (!proxyBypass || typeof proxyBypass !== 'string' || isEmpty(proxyBypass.trim())) {
    return true;
  }

  const parsedUrl = typeof url === 'string' ? parseUrl(url) : url || {};
  let proto = parsedUrl.protocol;
  let hostname = parsedUrl.host;
  let port = parsedUrl.port;
  if (typeof hostname !== 'string' || !hostname || typeof proto !== 'string') {
    return false; // Don't proxy URLs without a valid scheme or host.
  }

  proto = proto.split(':', 1)[0];
  // Stripping ports in this way instead of using parsedUrl.hostname to make
  // sure that the brackets around IPv6 addresses are kept.
  hostname = hostname.replace(/:\d*$/, '');
  port = parseInt(port) || DEFAULT_PORTS[proto] || 0;

  return proxyBypass.split(/[,;\s]/).every(function (dontProxyFor) {
    if (!dontProxyFor) {
      return true; // Skip zero-length hosts.
    }
    const parsedProxy = dontProxyFor.match(/^(.+):(\d+)$/);
    let parsedProxyHostname = parsedProxy ? parsedProxy[1] : dontProxyFor;
    const parsedProxyPort = parsedProxy ? parseInt(parsedProxy[2]) : 0;
    if (parsedProxyPort && parsedProxyPort !== port) {
      return true; // Skip if ports don't match.
    }

    if (!/^[.*]/.test(parsedProxyHostname)) {
      // No wildcards, so stop proxying if there is an exact match.
      return hostname !== parsedProxyHostname;
    }

    if (parsedProxyHostname.charAt(0) === '*') {
      // Remove leading wildcard.
      parsedProxyHostname = parsedProxyHostname.slice(1);
    }
    // Stop proxying if the hostname ends with the no_proxy host.
    return !hostname.endsWith(parsedProxyHostname);
  });
};

/**
 * Patched version of HttpsProxyAgent to get around a bug that ignores
 * options like ca and rejectUnauthorized when upgrading the socket to TLS:
 * https://github.com/TooTallNate/proxy-agents/issues/194
 */
class PatchedHttpsProxyAgent extends HttpsProxyAgent {
  constructor(proxy, opts) {
    super(proxy, opts);
    this.constructorOpts = opts;
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
  async connect(req, opts) {
    const combinedOpts = { ...this.constructorOpts, ...opts };
    return super.connect(req, combinedOpts);
  }
}

module.exports = {
  shouldUseProxy,
  PatchedHttpsProxyAgent
};
