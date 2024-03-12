const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const clients = [
  {
    client_id: 'client_id_1',
    client_secret: 'client_secret_1',
    scope: 'admin'
  }
];

const tokens = [];

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
function generateUniqueString() {
  return crypto.randomBytes(16).toString('hex');
}

router.post('/token', (req, res) => {
  let grant_type, client_id, client_secret, scope;
  if (req?.body?.grant_type) {
    grant_type = req?.body?.grant_type;
    client_id = req?.body?.client_id;
    client_secret = req?.body?.client_secret;
    scope = req?.body?.scope;
  } else if (req?.headers?.grant_type) {
    grant_type = req?.headers?.grant_type;
    client_id = req?.headers?.client_id;
    client_secret = req?.headers?.client_secret;
    scope = req?.headers?.scope;
  }

  console.log('client_cred', client_id, client_secret, scope);
  if (grant_type !== 'client_credentials') {
    return res.status(401).json({ error: 'Invalid Grant Type, expected "client_credentials"' });
  }

  const client = clients.find((c) => c.client_id == client_id && c.client_secret == client_secret && c.scope == scope);

  if (!client) {
    return res.status(401).json({ error: 'Invalid client details or scope' });
  }

  const token = generateUniqueString();
  tokens.push({
    token,
    client_id,
    client_secret,
    scope
  });

  return res.json({ message: 'Authenticated successfully', access_token: token, scope });
});

router.get('/resource', (req, res) => {
  try {
    const { token } = req.query;
    const storedToken = tokens.find((t) => t.token === token);
    if (!storedToken) {
      return res.status(401).json({ error: 'Invalid Access Token' });
    }
    return res.json({ resource: { name: 'foo', email: 'foo@bar.com' } });
  } catch (err) {
    return res.status(401).json({ error: 'Corrupt Access Token' });
  }
});

module.exports = router;
